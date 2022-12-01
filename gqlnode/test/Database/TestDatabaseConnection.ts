import { IDataSource } from "../../src/database/DatabaseConnection";
import { testDatabaseSource } from "./TestDataSource";

export const initializeTestDataSource = async (): Promise<IDataSource> => {
  return await testDatabaseSource.initialize();
};
