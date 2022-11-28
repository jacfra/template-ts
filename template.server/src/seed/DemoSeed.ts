import { inject, injectable } from "inversify";
import { IDataSource } from "../database/DatabaseConnection";
import { TYPES } from "../dependency-injection/types";
import { DemoEntity } from "../entity/DemoEntity";

export interface IDemoSeed {
  seed(): Promise<void>;
}

@injectable()
export class DemoSeed implements IDemoSeed {
  constructor(
    @inject(TYPES.DataSource)
    private dataSource: IDataSource
  ) {}
  async seed(): Promise<void> {
    const demoSeed = new DemoEntity();
    demoSeed.value = "Hello, World!";

    await this.dataSource.getRepository(DemoEntity).save(demoSeed);
  }
}
