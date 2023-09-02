import { Request } from "express";
import { Response } from "express-serve-static-core";
import { CategoryService } from "@app/Category/category.service";
import { container, inject, injectable } from "tsyringe";
import { CategoryDTO } from "./dto/category.dto";
import { CreateCategoryDTO } from "./dto/create.dto";
import { SystemQueue } from "@shared/AWS/sqs/sqs";

export class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const systemQueue = new SystemQueue();
      await systemQueue.addMessageQueue("message to body");
      /*       const { ownerId, title, description }: CreateCategoryDTO = req.body;
      const categoryService = container.resolve(CategoryService);

      const createCategory = await categoryService.create({
        title,
        description,
        ownerId,
      });

      */
      res.send("createCategory").status(200); 
    } catch (error) {
      console.log(error);
      res.send({ error: error }).status(400);
    }
  }
  async update(req: Request, res: Response) {}
  async delete(req: Request, res: Response) {}
}
