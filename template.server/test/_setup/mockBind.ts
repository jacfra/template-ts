import { IDataSource } from "../../src/database/DatabaseConnection";
import { initializeTestDataSource } from "../Database/TestDatabaseConnection";
import { container } from "../../src/dependency-injection/bind";
import { TYPES } from "../../src/dependency-injection/types";

container.snapshot();
const mockContainer = container;

// database

mockContainer
  .rebind<IDataSource>(TYPES.DataSource)
  .toDynamicValue(initializeTestDataSource)
  .inSingletonScope();

export { mockContainer };
