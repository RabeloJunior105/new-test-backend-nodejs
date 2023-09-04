import AppError from "@shared/Error/error.interceptor";
import { container, injectable } from "tsyringe";
import { ProductCreateDTO } from "./dto/create.dto";
import { ProductRepository } from "./product.repository";
import { CategoryService } from "@app/Category/category.service";
import { QueueService } from "@shared/AWS/sqs/sqs";
import { ProductUpdateDTO } from "./dto/update.dto";

@injectable()
export class ProductService {
  async find() {
    try {
      const repository = container.resolve(ProductRepository);
      const products = await repository.findAll();

      return products;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  async create(data: ProductCreateDTO) {
    try {
      const repository = container.resolve(ProductRepository);
      const categoryService = container.resolve(CategoryService);
      const queueService = container.resolve(QueueService);
      const findCategory = await categoryService.findById(data.categoryId);

      if (!findCategory) throw new AppError("Category not exits", 404);

      const products = await repository.create(data);

      queueService.addMessageQueue(products.ownerId);

      return products;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
  async update(id: string, data: ProductUpdateDTO) {
    try {
      const repository = container.resolve(ProductRepository);
      const queueService = container.resolve(QueueService);
      const findProduct = await repository.findById(id);

      if (!findProduct) throw new AppError("Product not exits", 404);

      const updateProduct = await repository.update(id, data);
      queueService.addMessageQueue(updateProduct.ownerId);

      return updateProduct;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
  async delete(id: string) {
    try {
      const repository = container.resolve(ProductRepository);
      const queueService = container.resolve(QueueService);

      const findProduct = await repository.findById(id);

      if (!findProduct) throw new AppError("Product not exits", 404);

      const deleteProduct = await repository.delete(id);
      
      queueService.addMessageQueue(deleteProduct.ownerId);

      return deleteProduct
        ? { message: "Product delete with succesfuly" }
        : { message: "Product not delete" };
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}
