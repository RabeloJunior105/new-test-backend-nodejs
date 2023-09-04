import { StorageBucket } from "@shared/AWS/s3/bucket";
import { S3Bucket } from "aws-sdk/clients/appstream";
import { NextFunction, Request } from "express";
import { Response } from "express-serve-static-core";
import { container } from "tsyringe";
import { CatalogService } from "./catalog.service";

export class CatalogController {
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { ownerId } = req.params;
      const service = container.resolve(CatalogService);

      const search = await service.search(ownerId);
      res.json(search);
    } catch (error) {
      next(error);
    }
  }
}
