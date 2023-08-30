import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();


const AppDatabase = new DataSource({
  type: "mongodb",
  synchronize: true,
  logging: ["query", "error"],
  entities: ["./src/**/*.entities.ts"],
  migrations: [],
  subscribers: [],
  url: process.env.DATABASE_MONGO_CONN,
});

export default AppDatabase;
