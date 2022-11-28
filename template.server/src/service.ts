import "reflect-metadata";
import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { container } from "./dependency-injection/bind";
import { DemoResolver } from "./resolver/DemoResolver";
import { IDemoSeed } from "./seed/DemoSeed";
import { TYPES } from "./dependency-injection/types";
import { IMigrationService } from "./service/MigrationService";

(async () => {
  const migrationService = await container.getAsync<IMigrationService>(
    TYPES.MigrationService
  );
  await migrationService.latest();

  const demoSeed = await container.getAsync<IDemoSeed>(TYPES.DemoSeed);
  await demoSeed.seed();

  const app = express();

  app.use(express.static("public"));
  let schema;

  schema = await buildSchema({
    resolvers: [DemoResolver],
    container,
  });

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`http://localhost:${port}/graphql`);
  });
})();
