import { NextFunction, Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { ProductService } from "./product.service";
import { ProductCreateDTO } from "./dto/create.dto";


@injectable()
export class ProductController {
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const productService = container.resolve(ProductService);

      const allProducts = await productService.find();
      res.json({ products: allProducts }).status(200);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, price, categoryId, ownerId } = req.body;
      const productService = container.resolve(ProductService);

      const createProduct = await productService.create({
        title,
        description,
        price,
        categoryId,
        ownerId,
      });

      res.json({ product: createProduct }).status(200);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, price, categoryId, ownerId } = req.body;
      const { id } = req.params;
      const productService = container.resolve(ProductService);

      const updateProduct = await productService.update(id, {
        title,
        description,
        price,
        categoryId,
        ownerId,
      });

      res.json({ product: updateProduct }).status(200);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const productService = container.resolve(ProductService);

      const deleteProduct = await productService.delete(id);

      res.json({ product: deleteProduct }).status(200);
    } catch (error) {
      next(error);
    }
  }
}
