import express from "express";
import "reflect-metadata";
import cors from "cors";
import router from "./app/shared/Http/router";
import AppError from "./app/shared/Error/error.interceptor";
import { Request, Response } from "express-serve-static-core";
import { NextFunction } from "connect";
import { Logger } from "./app/shared/Logger/logger.helper";
import dotenv from "dotenv";
import { Consumer } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";
import { CatalogConsumer } from "@app/Catalog/consumer/catalog.consumer";
dotenv.config();
const app = express();

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      error: {
        statusCode: err.statusCode,
        message: err.message,
      },
    });
  }

  return response.status(500).json({
    statusCode: 500,
    message: "Internal server error",
  });
});

CatalogConsumer().start();
app.listen(process.env.PORT ?? 3000, () => {
  Logger().info(`Start Server: ${process.env.PORT ?? 3000}`);
});
