import { StorageBucket } from "@shared/AWS/s3/bucket";
import AppError from "@shared/Error/error.interceptor";
import { S3Bucket } from "aws-sdk/clients/appstream";
import { NextFunction, Request } from "express";
import { Response } from "express-serve-static-core";

export class CatalogService {
  private storageBucket: StorageBucket;
  constructor() {
    this.storageBucket = new StorageBucket();
  }

  async search(ownerId: string) {
    try {
      const findStorage = await this.storageBucket.findFiles(ownerId);

      return findStorage;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}
