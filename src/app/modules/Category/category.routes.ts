import { Router } from "express";
import { CategoryController } from "./category.controller";

export const CategoryRoutes = Router();

const categoryController = new CategoryController();

CategoryRoutes.get("/category/", categoryController.findAllOwner);

CategoryRoutes.get("/category/:id", categoryController.findbyId);

CategoryRoutes.post("/category", categoryController.create);
CategoryRoutes.put("/category/:id", categoryController.update);
CategoryRoutes.delete("/category/:id", categoryController.delete);
