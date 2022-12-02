import { DataSource } from "typeorm";
import { DemoEntity } from "../../entity/DemoEntity";

export const testDatabaseSource = new DataSource({
  entities: [DemoEntity],
  type: "sqljs",
  synchronize: true,
  dropSchema: true,
});
