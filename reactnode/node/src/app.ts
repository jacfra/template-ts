import "reflect-metadata";
import * as express from "express";
// import * as https from "https";
import * as http from "http";
import { Response, Request /*NextFunction*/ } from "express";
// import * as fs from "fs";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/require-await
void (async () => {
  try {
    const app = express();

    app.get("/ping", (_req: Request, res: Response) => {
      res.status(200).json({ response: "pong" });
    });

    // app.all("*", (req: Request, res: Response, next: NextFunction) => {
    //   if (req.secure) {
    //     return next();
    //   }
    //   res.redirect(`https://${req.hostname}${req.url}`);
    // });

    const staticFilePath = path.join(__dirname, "/public");
    app.use(express.static(staticFilePath));

    // const SERVER_KEY_PATH = path.join(__dirname, "/cert/domain.key");
    // const SERVER_CERT_PATH = path.join(__dirname, "/cert/domain.crt");

    // const key = fs.readFileSync(SERVER_KEY_PATH, "utf8");
    // const certificate = fs.readFileSync(SERVER_CERT_PATH, "utf8");

    // const credentials = {
    //   key,
    //   certificate,
    // };

    // const httpsServer = https.createServer(credentials, app);

    // httpsServer.listen(process.env.REACTNODE_HTTPS_PORT, () => {
    //   console.log(`https://localhost:${process.env.REACTNODE_HTTPS_PORT}/`);
    // });

    const httpServer = http.createServer(app);

    httpServer.listen(process.env.REACTNODE_HTTP_PORT, () => {
      console.log(`http://localhost:${process.env.REACTNODE_HTTP_PORT}/`);
    });
  } catch (err) {
    console.log(err);
  }
})();
