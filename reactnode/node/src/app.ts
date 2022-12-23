import "reflect-metadata";
import * as express from "express";
import * as http from "http";
import { Response, Request } from "express";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/require-await
void (async () => {
  try {
    const app = express();

    app.get("/ping", (_req: Request, res: Response) => {
      res.status(200).json({ response: "pong" });
    });

    const staticFilePath = path.join(__dirname, "/public");
    app.use(express.static(staticFilePath));

    const httpServer = http.createServer(app);

    httpServer.listen(process.env.REACTNODE_PORT, () => {
      console.log(`http://localhost:${process.env.REACTNODE_PORT}/`);
    });
  } catch (err) {
    console.log(err);
  }
})();
