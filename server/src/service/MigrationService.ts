import { inject, injectable } from "inversify";
import { TYPES } from "../dependency-injection/types";
import { IDataSource } from "../database/DatabaseConnection";
import { ILogger } from "../utility/Log/Logger";

export interface IMigrationService {
  up(): Promise<void>;
  upByName(name: string): Promise<void>;
  down(): Promise<void>;
  downByName(name: string): Promise<void>;
  latest(): Promise<void>;
}

@injectable()
export class MigrationService implements IMigrationService {
  private indexFromLast = 0;
  constructor(
    @inject(TYPES.DataSource)
    private dataSource: IDataSource,
    @inject(TYPES.Logger)
    private log: ILogger
  ) {}

  async upByName(name: string) {
    let migrations = this.dataSource.migrations;
    let migration = migrations.find(x => x.name == name);
    this.log.info(migration.name);
    const queryRunner = this.dataSource.createQueryRunner();
    await migration.up(queryRunner);
  }

  async downByName(name: string) {
    let migrations = this.dataSource.migrations;
    let migration = migrations.find(x => x.name == name);
    this.log.info(migration.name);
    const queryRunner = this.dataSource.createQueryRunner();
    await migration.down(queryRunner);
  }

  // only works as well as the migrations are written
  // i.e. check every table, column, index, primary key, foriegn key, etc
  async latest() {
    let migrations = this.dataSource.migrations;
    for (const migration of migrations) {
      this.log.info(migration.name);
      const queryRunner = this.dataSource.createQueryRunner();
      await migration.up(queryRunner);
    }
  }

  mostRecentMigration() {
    const migrations = this.dataSource.migrations;
    const zeroBasedMigrationLength = migrations.length - 1;
    return migrations[zeroBasedMigrationLength - this.indexFromLast];
  }

  async down(): Promise<void> {
    const currentMigration = this.mostRecentMigration();
    this.log.info(currentMigration.name);
    const queryRunner = this.dataSource.createQueryRunner();
    await currentMigration.down(queryRunner);
    this.indexFromLast++;
  }

  async up(): Promise<void> {
    if (this.indexFromLast <= 0) {
      this.log.info("Migrations are up to date");
      return;
    }

    this.indexFromLast--;

    const currentMigration = this.mostRecentMigration();
    this.log.info(currentMigration.name);
    const queryRunner = this.dataSource.createQueryRunner();
    await currentMigration.up(queryRunner);
  }
}
