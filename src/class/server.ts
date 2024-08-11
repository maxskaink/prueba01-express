import express from "express";
import morgan from "morgan";

import usersRoutes from "../Routes/users/users.routes.ts";

export default class Server {
    private app: express.Application;
    private port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.initMiddlewares();
        this.initRoutes();
        this.initServer();
    }

    initMiddlewares(): void {
        this.app.use(morgan("dev"));
        this.app.use(express.json());
    }
    initRoutes():void {
        this.app.use(usersRoutes);
    }

    initServer(): void{
        this.app.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }
}