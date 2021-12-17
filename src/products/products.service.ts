import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  private products: ProductDto[] = [];

  insertProduct(productData: ProductDto): ProductDto {
    const product = { id: this.products.length + 1, ...productData };

    this.products.push(product);
    return product;
  }

  listProducts() {
    return [...this.products];
  }

  getProduct(productId: number) {
    const product = this.products.find((item) => item.id === productId);
    if (!product) throw new NotFoundException();
    return { ...product };
  }

  updateProduct(id: number, newProductData: ProductDto) {
    const productIndex = this.products.findIndex((item) => item.id === id);
    const product = this.products[productIndex];

    if (!product) throw new NotFoundException();

    const updatedProduct = {
      ...product,
      ...newProductData,
      id: product.id,
    };

    this.products[productIndex] = updatedProduct;

    return updatedProduct;
  }

  deleteProduct(id: number) {
    const productIndex = this.products.findIndex((item) => item.id === id);
    if (productIndex < 0) throw new NotFoundException();

    this.products.splice(productIndex, 1);
  }
}
