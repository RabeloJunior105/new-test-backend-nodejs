import { Router } from "express";
import { ProductController } from "./product.controller";

export const ProductRoutes = Router();

const productController = new ProductController();

ProductRoutes.get("/product", productController.find);
ProductRoutes.post("/product", productController.create);
ProductRoutes.put("/product/:id", productController.update);
ProductRoutes.delete("/product/:id", productController.delete);
