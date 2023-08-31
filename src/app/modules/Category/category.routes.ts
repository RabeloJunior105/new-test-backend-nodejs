import { Router } from "express";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "./category.repository";

export const CategoryRoutes = Router();

const categoryController = new CategoryController(
  new CategoryService(new CategoryRepository())
);

CategoryRoutes.get("/category", categoryController.create);
