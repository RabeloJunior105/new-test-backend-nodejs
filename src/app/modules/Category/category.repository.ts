import { PrismaClient } from "@prisma/client";
import { CategoryDTO } from "./dto/category.dto";
import { injectable } from "tsyringe";
import { CreateCategoryDTO } from "./dto/create.dto";
import { UpdateCategoryDTO } from "./dto/update.dto";
import { Nullable } from "./Interfaces/iNullableString.interface";

@injectable()
export class CategoryRepository {
  private category;
  constructor() {
    this.category = new PrismaClient().category;
  }

  async findAllOwner(ownerId?: Nullable<string>) {
    return ownerId
      ? await this.category.findMany({
          where: {
            ownerId,
            isDeleted: false,
          },
          include: {
            Product: true,
          },
        })
      : await this.category.findMany({
          where: {
            isDeleted: false,
          },
          include: {
            Product: true,
          },
        });
  }

  async findById(id: string) {
    return await this.category.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async create(data: CreateCategoryDTO) {
    return await this.category.create({ data });
  }

  async update(id: string, data: UpdateCategoryDTO) {
    return await this.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await this.category.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }
}
