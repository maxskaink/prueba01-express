import express from "express";
import morgan from "morgan";

import { authMiddleware } from "../middlewares/utils/auth.middleware.js";

import usersRoutes from "../Routes/users/users.routes.js";
import utilsRoutes from "../Routes/utils/utils.routes.js";
import filesRoutes from "../Routes/files/files.routes.js";


export default class Server {
  constructor(port) {
    //Initializace values of server
    this.app = express();
    this.port = port;

    //Middlewares
    this.initMiddlewares();
    //Routes
    this.initRoutes();
    //initialization of server (listening)
    this.initServer();
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use( "/files",authMiddleware);
  }

  initRoutes() {
    this.app.use(usersRoutes);
    this.app.use(utilsRoutes);
    this.app.use(filesRoutes);
  }

  initServer() {
    this.app.listen(this.port, () => {
      console.log(`Server runing on port ${this.port}`);
    });
  }
}
