import express from "express";
import router from "./router";
import cookieParser from "cookie-parser";
class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddleWares();
  }

  initializeMiddleWares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use("/api/v1/", router);
  }
}

const { app } = new App();

export default app;
