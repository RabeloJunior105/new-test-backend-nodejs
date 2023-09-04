import { NextFunction, Request } from "express";
import { Response } from "express-serve-static-core";
import { CategoryService } from "@app/Category/category.service";
import { container, inject, injectable } from "tsyringe";
import { CategoryDTO } from "./dto/category.dto";
import { CreateCategoryDTO } from "./dto/create.dto";
import AppError from "@shared/Error/error.interceptor";

@injectable()
export class CategoryController {
  async findAllOwner(req: Request, res: Response, next: NextFunction) {
    try {
      const { ownerId } = req.query;
      const categoryService = container.resolve(CategoryService);
      const allCategories = await categoryService
        .findAllOwner(ownerId ? String(ownerId) : ownerId)
        .catch((error) => {
          throw new AppError(error.message, error.statusCode);
        });

      res.json(allCategories).status(200);
    } catch (error) {
      next(error);
    }
  }

  async findbyId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const categoryService = container.resolve(CategoryService);
      const findCategory = await categoryService.findById(id).catch((error) => {
        throw new AppError(error.message, error.statusCode);
      });

      res.json(findCategory).status(200);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, ownerId } = req.body;
      const categoryService = container.resolve(CategoryService);

      const findCategory = await categoryService.create({
        title,
        description,
        ownerId,
      });

      res.json(findCategory).status(200);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, description, ownerId } = req.body;
      const categoryService = container.resolve(CategoryService);

      const categoryUpdated = await categoryService.update(id, {
        title,
        description,
        ownerId,
      });

      res.json(categoryUpdated).status(200);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const categoryService = container.resolve(CategoryService);
      const deleteCategory = await categoryService.delete(id);
      res.json(deleteCategory).status(200);
    } catch (error) {
      next(error);
    }
  }
}
