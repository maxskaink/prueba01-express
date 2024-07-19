import express from "express";
import usersRoutes from "../Routes/users/users.routes.js";
import utilsRoutes from "../Routes/utils/utils.routes.js";

export default class Server{
    constructor( port ){
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

    initMiddlewares(){
        this.app.use(express.json());
    }

    initRoutes(){
        this.app.use(usersRoutes);
        this.app.use(utilsRoutes);
    }

    initServer() {
        this.app.listen(this.port, () => {
            console.log(`Server runing on port ${this.port}`);
        });
    }
}
