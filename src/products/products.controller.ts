import {
  Controller,
  HttpCode,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(201)
  addProduct(@Body() productData: ProductDto) {
    const product = this.productsService.insertProduct(productData);

    return product;
  }

  @Get()
  listProducts() {
    return this.productsService.listProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productsService.getProduct(parseInt(productId));
  }

  @Patch(':id')
  partialUpdateProduct(
    @Param('id') productId: string,
    @Body() productData: ProductDto,
  ) {
    return this.productsService.updateProduct(parseInt(productId), productData);
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    this.productsService.deleteProduct(parseInt(productId));
    return null;
  }
}
