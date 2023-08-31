import { Request } from "express";
import { Response } from "express-serve-static-core";
import { CategoryService } from "./category.service";

/* import { Category } from "./models/category.model"; */

export class CategoryController {
  private repository;
  constructor(private CategoryService: CategoryService) {
    this.repository = {};
  }

  async create(req: Request, res: Response) {
/*     console.log("Cheguei no controlelr");
    const categories = new Category();
    categories.title = "JR";
    categories.description = "description JR";
    categories.ownerId = "123123aadsd";
     */
    
    res.send({ txt: "salve" });
  }
  async update(req: Request, res: Response) {}
  async delete(req: Request, res: Response) {}
}
