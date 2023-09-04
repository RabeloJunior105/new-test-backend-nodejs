import { Router } from "express";
import { CatalogController } from "./catalog.controller";

export const CatalogRoutes = Router();

const catalogController = new CatalogController();


