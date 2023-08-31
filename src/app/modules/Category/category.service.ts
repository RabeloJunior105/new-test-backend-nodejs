import { Request } from "express";
import { Response } from "express-serve-static-core";
import { CategoryRepository } from "./category.repository";

export class CategoryService {
  constructor(private CategoryRepository: CategoryRepository) {}

  async create() {
    console.log("create")
  }
  async update() {}
  async delete() {}
}
