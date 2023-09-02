import { Router } from "express";
import { CategoryController } from "./category.controller";
import { CategoryService } from "@app/Category/category.service";
import { CategoryRepository } from "./category.repository";

export const CategoryRoutes = Router();

const categoryController = new CategoryController();

CategoryRoutes.post("/category", categoryController.create);
