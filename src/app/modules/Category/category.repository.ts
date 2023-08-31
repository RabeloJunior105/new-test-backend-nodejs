import { PrismaClient } from "@prisma/client";
import { CategoryDTO } from "./dto/category.dto";

export class CategoryRepository {
  private Category;
  constructor() {
    this.Category = new PrismaClient().category;
  }
  async create(data: CategoryDTO) {
    return await this.Category.create({
      data: {
        title: data.title,
        description: data.description,
        ownerId: data.ownerId,
      },
    });
  }

  async update(id: string, data: CategoryDTO) {
    return await this.Category.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    return await this.Category.update({
      where: { id },
      data: {
        deletedAt: new Date(Date.now()),
      },
    });
  }
}
