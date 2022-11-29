import { DataSource } from "typeorm";
import { DemoEntity } from "../entity/DemoEntity";
import { DemoMigration } from "../migration/DemoMigration";
import { Log } from "../utility/Log/Logger";

export let databaseSource = new DataSource({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [DemoEntity],
  migrations: [DemoMigration],
  type: "postgres",
  logger: Log,
  dropSchema: false,
  synchronize: false,
  migrationsRun: true,
});
