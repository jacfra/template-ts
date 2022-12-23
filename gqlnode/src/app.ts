import "reflect-metadata";
import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { container } from "./dependency-injection/bind";
import { DemoResolver } from "./resolver/DemoResolver";
import { IDemoSeed } from "./seed/DemoSeed";
import { TYPES } from "./dependency-injection/types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Response, Request } from "express";
import * as http from "http";

void (async () => {
  try {
    const demoSeed = await container.getAsync<IDemoSeed>(TYPES.DemoSeed);
    await demoSeed.seed();

    const app: express.Application = express();

    app.get("/ping", (_req: Request, res: Response) => {
      res.status(200).json({ response: "pong" });
    });

    app.use(express.static("public"));

    const schema = await buildSchema({
      resolvers: [DemoResolver],
      container,
    });

    const options = {
      schema,
      graphiql: true,
    };

    // eslint is yakking about an misused promise (?)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    app.use("/graphql", graphqlHTTP(options));

    const httpServer = http.createServer(app);

    httpServer.listen(process.env.GQLNODE_PORT, () => {
      console.log(`http://localhost:${process.env.GQLNODE_PORT}/graphql`);
    });
  } catch (err) {
    console.log(err);
  }
})();
