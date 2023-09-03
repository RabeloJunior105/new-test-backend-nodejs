import AppError from "@shared/Error/error.interceptor";
import { container, injectable } from "tsyringe";
import { ProductCreateDTO } from "./dto/create.dto";
import { ProductRepository } from "./product.repository";
import { CategoryService } from "@app/Category/category.service";

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
      const findCategory = await categoryService.findById(data.categoryId);

      if (!findCategory) throw new AppError("Category not exits", 404);

      const products = await repository.create(data);

      return products;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
  async update(id: string, data: ProductCreateDTO) {
    try {
      const repository = container.resolve(ProductRepository);
      const findProduct = await repository.findById(id);

      if (!findProduct) throw new AppError("Product not exits", 404);

      return await repository.update(id, data);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
  async delete(id: string) {
    try {
      const repository = container.resolve(ProductRepository);
      const findProduct = await repository.findById(id);
      if (!findProduct) throw new AppError("Product not exits", 404);
      const deleteProduct = await repository.delete(id);
      return deleteProduct
        ? { message: "Product delete with succesfuly" }
        : { message: "Product not delete" };
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}
