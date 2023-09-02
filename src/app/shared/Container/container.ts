import { CategoryRepository } from "@app/Category/category.repository";
import { CategoryService } from "@app/Category/category.service";
import { container } from "tsyringe";

container.registerSingleton<CategoryService>(
  "CategoryService",
  CategoryService
);

container.registerSingleton<CategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
