import { Container } from "inversify";
import {
  IDataSource,
  initializeDataSource,
} from "../database/DatabaseConnection";
import { DemoResolver, IDemoResolver } from "../resolver/DemoResolver";
import { DemoSeed, IDemoSeed } from "../seed/DemoSeed";
import { DemoService, IDemoService } from "../service/DemoService";
import {
  IMigrationService,
  MigrationService,
} from "../service/MigrationService";
import { ILogger, Log } from "../utility/Log/Logger";
import { TYPES } from "./types";

const container = new Container();

(async () => {
  // utility
  container.bind<ILogger>(TYPES.Logger).toConstantValue(Log);

  // database
  container
    .bind<IDataSource>(TYPES.DataSource)
    .toDynamicValue(initializeDataSource)
    .inSingletonScope();

  // seed
  container.bind<IDemoSeed>(TYPES.DemoSeed).to(DemoSeed);

  // service
  container.bind<IDemoService>(TYPES.DemoService).to(DemoService);
  container
    .bind<IMigrationService>(TYPES.MigrationService)
    .to(MigrationService);

  // resolver
  container.bind<IDemoResolver>(DemoResolver).toSelf();
})();

export { container };
