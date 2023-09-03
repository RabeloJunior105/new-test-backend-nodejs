import { CategoryRepository } from "./category.repository";
import AppError from "app/shared/Error/error.interceptor";
import { Logger } from "app/shared/Logger/logger.helper";
import { container, inject, injectable } from "tsyringe";
import { CategoryDTO } from "./dto/category.dto";
import { CreateCategoryDTO } from "./dto/create.dto";
import { UpdateCategoryDTO } from "./dto/update.dto";
import { Nullable } from "./Interfaces/iNullableString.interface";

@injectable()
export class CategoryService {
  async findAllOwner(ownerId?: Nullable<string>) {
    try {
      const repository = container.resolve(CategoryRepository);
      const categories = await repository.findAllOwner(ownerId);

      return { categories };
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode ?? 400);
    }
  }

  async findById(id: string) {
    try {
      const repository = container.resolve(CategoryRepository);

      const category = await repository.findById(id);

      if (!category) throw new AppError("Category Not Exists", 404);

      return { category };
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  async create(data: CreateCategoryDTO) {
    try {
      const repository = container.resolve(CategoryRepository);

      if (!data.ownerId) throw new AppError("Owner Id required");

      const createCategory = await repository.create(data);

      return createCategory;
    } catch (err: any) {
      throw new AppError(err.message, err.statusCode);
    }
  }
  async update(id: string, data: UpdateCategoryDTO) {
    try {
      const repository = container.resolve(CategoryRepository);

      if (!data.ownerId)
        throw new AppError("changing category owner is not allowed");

      return await repository.update(id, data);
    } catch (err: any) {
      throw new AppError(err.message, err.statusCode);
    }
  }

  async delete(id: string) {
    try {
      const repository = container.resolve(CategoryRepository);

      const findCategory = await repository.findById(id);

      if (!findCategory) throw new AppError("Category not exists", 404);
      await repository.delete(id);
      return {
        category: { message: "The category has been successfully deleted" },
      };
    } catch (err: any) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}
