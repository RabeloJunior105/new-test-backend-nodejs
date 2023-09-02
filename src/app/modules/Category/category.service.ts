import { CategoryRepository } from "./category.repository";
import AppError from "app/shared/Error/error.interceptor";
import { Logger } from "app/shared/Logger/logger.helper";
import { container, inject, injectable } from "tsyringe";
import { CategoryDTO } from "./dto/category.dto";
import { CreateCategoryDTO } from "./dto/create.dto";

@injectable()
export class CategoryService {
  async create(data: CreateCategoryDTO) {
    try {
      const repository = container.resolve(CategoryRepository);

      const createCategory = await repository.create(data);

      return createCategory;
    } catch (err: any) {
      throw new AppError(
        err.message ?? "Não foi possivel finalizar seu cadastro",
        err.statusCode ?? 400
      );
    }
  }
  async update() {}
  async delete() {}
}
