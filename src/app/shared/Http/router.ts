import { CategoryRoutes } from "@app/Category/category.routes";
import express from "express";

const router = express.Router();

router.get("/");
router.use(CategoryRoutes);

export = router;
