import { PrismaClient } from "@prisma/client";
import { CategoryDTO } from "./dto/category.dto";
import { injectable } from "tsyringe";
import { CreateCategoryDTO } from "./dto/create.dto";

@injectable()
export class CategoryRepository {
  private category;
  constructor() {
    this.category = new PrismaClient().category;
  }

  async findById(id: string) {
    return await this.category.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateCategoryDTO) {
    const prismaClient = new PrismaClient();
    return await prismaClient.category.create({
      data: {
        title: "title 2",
        description: "description 2",
        ownerId: "342342",
      },
    });
  }

  async update(id: string, data: CategoryDTO) {
    return await this.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await this.category.update({
      where: { id },
      data: {
        deletedAt: new Date(Date.now()),
      },
    });
  }
}
