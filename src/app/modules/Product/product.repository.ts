import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { ProductCreateDTO } from "./dto/create.dto";
import AppError from "@shared/Error/error.interceptor";

@injectable()
export class ProductRepository {
  private product;
  constructor() {
    this.product = new PrismaClient().product;
  }

  async findAll() {
    try {
      return await this.product.findMany({
        where: {
          isDeleted: false,
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  async findById(id: string) {
    try {
      return await this.product.findUnique({
        where: {
          id,
          isDeleted: false,
        },
        include: {
          category: true,
        },
      });
    } catch (error: any) {
      console.log(error);
      throw new AppError(error.message, error.statusCode);
    }
  }

  async create(data: any) {
    try {
      return await this.product.create({
        data: {
          title: data.title,
          description: data.title,
          price: Number(data.price),
          categoryId: data.categoryId,
          ownerId: data.ownerId,
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.product.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  async delete(id: string) {
    try {
      return await this.product.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}
