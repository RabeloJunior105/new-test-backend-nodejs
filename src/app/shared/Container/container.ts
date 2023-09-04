import { CatalogService } from "@app/Catalog/catalog.service";
import { CategoryRepository } from "@app/Category/category.repository";
import { CategoryService } from "@app/Category/category.service";
import { ProductRepository } from "@app/Product/product.repository";
import { ProductService } from "@app/Product/product.service";
import { QueueService } from "@shared/AWS/sqs/sqs";
import { container } from "tsyringe";

//Register Singleton Module Category
container.registerSingleton<CategoryService>(
  "CategoryService",
  CategoryService
);

container.registerSingleton<CategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

//Register Singleton Module Product

container.registerSingleton<ProductService>("ProductService", ProductService);

container.registerSingleton<ProductRepository>(
  "ProductRepository",
  ProductRepository
);

container.registerSingleton<QueueService>("QueueService", QueueService);

container.registerSingleton<CatalogService>("CatalogService", CatalogService);
