import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import http from "http";

import "dotenv/config";
import { PORT } from "./common/private-keys";
import corsConfig from "./config/cors";
import errorHandler from "./helpers/error-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

/*
 * Cors is enabled so the client can acces enpoint on this API wthout having to make request
 *  from the same Origin
 */

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", corsConfig.origins);
  res.header("Access-Control-Allow-Headers", corsConfig.headers);
  if (req.method === "OPTIONS") {
    // preflight requests
    res.header("Access-Control-Allow-Methods", corsConfig.methods);
    return res.status(200).json({});
  }
  next();
  return true;
});

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({
    message: "Hello manuel. server is active",
  });
});

//catching 404 errors and forwarding to error handler
app.use((_: Request, res: Response) => {
  res.status(404).json({
    error: true,
    message: "you seem to be lost",
  });
});

app.use(errorHandler);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
