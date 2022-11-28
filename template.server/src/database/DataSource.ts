import { DataSource } from "typeorm";
import { DemoEntity } from "../entity/DemoEntity";
import { DemoMigration } from "../migration/DemoMigration";
import { Log } from "../utility/Log/Logger";

export let databaseSource = new DataSource({
  name: "serve",
  host: "localhost",
  port: 5432,
  username: "dev",
  password: "devpw",
  database: "devdb",
  entities: [DemoEntity],
  migrations: [DemoMigration],
  type: "postgres",
  logger: Log,
  dropSchema: true,
});
