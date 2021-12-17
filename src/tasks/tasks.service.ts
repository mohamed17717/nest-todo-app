import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { TaskInterface } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  listTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  createTask(newTask: TaskInterface): Promise<TaskEntity> {
    return this.taskRepository.save(newTask);
  }

  private async getTask(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException();

    return task;
  }

  retrieveTask(id: number): Promise<TaskEntity> {
    const task = this.getTask(id);
    return task;
  }

  updateTask(id: number, newTask: TaskInterface) {
    return this.taskRepository.update(id, newTask);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
