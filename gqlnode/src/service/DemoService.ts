import { inject, injectable } from "inversify";
import { IDataSource } from "../database/DatabaseConnection";
import { TYPES } from "../dependency-injection/types";
import { DemoEntity } from "../entity/DemoEntity";

export interface IDemoService {
  demo(): Promise<DemoEntity[]>;
}

@injectable()
export class DemoService implements IDemoService {
  constructor(
    @inject(TYPES.DataSource)
    private dataSource: IDataSource
  ) {}
  async demo(): Promise<DemoEntity[]> {
    return await this.dataSource.getRepository(DemoEntity).find();
  }
}
