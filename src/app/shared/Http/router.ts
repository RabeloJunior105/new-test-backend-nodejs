import { CategoryRoutes } from "@app/Category/category.routes";
import { ProductRoutes } from "@app/Product/product.routes";
import express from "express";

const router = express.Router();

router.get("/");
router.use(CategoryRoutes);
router.use(ProductRoutes);

export = router;
