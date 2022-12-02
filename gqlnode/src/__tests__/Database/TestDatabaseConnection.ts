import { IDataSource } from "../../database/DatabaseConnection";
import { testDatabaseSource } from "./TestDataSource";

export const initializeTestDataSource = async (): Promise<IDataSource> => {
  return await testDatabaseSource.initialize();
};
