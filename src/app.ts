import express from "express";
import cors from "cors";
import router from "./app/shared/http/router";
import AppError from "./app/shared/Error/error.interceptor";
import { Request, Response } from "express-serve-static-core";
import { NextFunction } from "connect";
import { Logger } from "./app/shared/logger/logger.helper";
import dotenv from "dotenv";
import AppDatabase from "./app/shared/http/database/database";

dotenv.config();
const app = express();

app.use(cors({ origin: ["http://localhost:3000"] }));

app.use("/", router);

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
    status: "error",
    message: "Internal server error",
  });
});

AppDatabase.initialize()
  .then(() => {
    Logger().info(`Database Started`);
  })
  .catch((err) => {
    Logger().error(`Database Error`, err);
  });

app.listen(process.env.PORT ?? 3000, () => {
  Logger().info(`Start Server: ${process.env.PORT ?? 3000}`);
});
