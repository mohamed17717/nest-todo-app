import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskInterface } from './interfaces/task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  listTasks() {
    return this.taskService.listTasks();
  }

  @Post()
  createTask(@Body() task: TaskInterface) {
    return this.taskService.createTask(task);
  }

  @Get(':id')
  retrieveTask(@Param('id') id: number) {
    return this.taskService.retrieveTask(id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() task: TaskInterface) {
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
