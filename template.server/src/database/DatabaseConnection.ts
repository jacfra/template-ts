import {
  EntityTarget,
  Migration,
  MigrationInterface,
  ObjectLiteral,
  QueryRunner,
  ReplicationMode,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { databaseSource } from "./DataSource";

export interface IDataSource {
  createQueryBuilder(queryRunner?: QueryRunner): SelectQueryBuilder<any>;
  createQueryRunner(mode?: ReplicationMode): QueryRunner;
  getRepository<Entity extends ObjectLiteral>(
    target: EntityTarget<Entity>
  ): Repository<Entity>;
  runMigrations(options?: {
    transaction?: "all" | "none" | "each";
  }): Promise<Migration[]>;
  migrations: MigrationInterface[];
  isInitialized: boolean;
  undoLastMigration(options?: {
    transaction?: "all" | "none" | "each";
  }): Promise<void>;
}

export const initializeDataSource = async (): Promise<IDataSource> => {
  return await databaseSource.initialize();
};
