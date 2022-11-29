import { DataSource } from "typeorm";
import { DemoEntity } from "../../src/entity/DemoEntity";

export let testDatabaseSource = new DataSource({
  entities: [DemoEntity],
  type: "sqljs",
  synchronize: true,
  dropSchema: true,
});
