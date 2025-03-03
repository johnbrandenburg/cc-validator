import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import express, { Request, Response } from "express";
import "express-async-errors";

import BaseRouter from "@src/routes";

import Paths from "@src/common/Paths";
import ENV from "@src/common/ENV";
import { NodeEnvs } from "@src/common/constants";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan("dev"));
}

if (ENV.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

app.use(Paths.Base, BaseRouter);

app.get("/health", (_: Request, res: Response) => {
  res.json({ status: "ok" });
});

export default app;
