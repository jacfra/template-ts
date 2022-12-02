import { IDataSource } from "../../database/DatabaseConnection";
import { initializeTestDataSource } from "../Database/TestDatabaseConnection";
import { container } from "../../dependency-injection/bind";
import { TYPES } from "../../dependency-injection/types";

container.snapshot();
const mockContainer = container;

// database

mockContainer
  .rebind<IDataSource>(TYPES.DataSource)
  .toDynamicValue(initializeTestDataSource)
  .inSingletonScope();

export { mockContainer };
