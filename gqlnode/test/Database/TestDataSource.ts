import { DataSource } from "typeorm";
import { DemoEntity } from "../../src/entity/DemoEntity";

export const testDatabaseSource = new DataSource({
  entities: [DemoEntity],
  type: "sqljs",
  synchronize: true,
  dropSchema: true,
});
