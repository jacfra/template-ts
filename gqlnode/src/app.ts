import "reflect-metadata";
import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { container } from "./dependency-injection/bind";
import { DemoResolver } from "./resolver/DemoResolver";
import { IDemoSeed } from "./seed/DemoSeed";
import { TYPES } from "./dependency-injection/types";
import { NextFunction, Response, Request } from "express";
import * as http from "http";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";

(async () => {
  try {
    const demoSeed = await container.getAsync<IDemoSeed>(TYPES.DemoSeed);
    await demoSeed.seed();

    const app: express.Application = express();

    app.get("/ping", (_req: Request, res: Response) => {
      res.status(200).json({ response: "pong" });
    });

    // app.all("*", (req: Request, res: Response, next: NextFunction) => {
    //   if (req.secure) {
    //     return next();
    //   }
    //   const ssl_url = `https://${req.hostname}:${process.env.GQLNODE_HTTPS_PORT}${req.url}`;

    //   console.log(ssl_url);

    //   res.redirect(ssl_url);
    // });

    // app.use(express.static("public"));
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

    // const SERVER_KEY_PATH = path.join(__dirname, "/cert/domain.key");
    // const SERVER_CERT_PATH = path.join(__dirname, "/cert/domain.crt");

    // const key = fs.readFileSync(SERVER_KEY_PATH, "utf8");
    // const certificate = fs.readFileSync(SERVER_CERT_PATH, "utf8");

    // const credentials = {
    //   key,
    //   certificate,
    // };

    // const httpsServer = https.createServer(credentials, app);

    // httpsServer.listen(process.env.GQLNODE_HTTPS_PORT, () => {
    //   console.log(`https://localhost:${process.env.GQLNODE_HTTPS_PORT}/graphql`);
    // });

    const httpServer = http.createServer(app);

    httpServer.listen(process.env.GQLNODE_HTTP_PORT, () => {
      console.log(`http://localhost:${process.env.GQLNODE_HTTP_PORT}/graphql`);
    });
  } catch (err) {
    console.log(err);
  }
})();
