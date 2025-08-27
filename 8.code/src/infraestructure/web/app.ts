//endpoint: direccion del recurso que se va a consumir

import express, {Request, Response} from 'express';
import userRouter from '../routes/UserRoutes';
class App{
    private app: express.Application;

    constructor(){
        this.app = express();
        this.middleware()
        this.routes();
    }

    private middleware(): void{
        this.app.use(express.json());
    }

    private routes(): void{
        this.app.use("/api", userRouter);
      
    }
    getApp(){
        return this.app;
    }
}


export default new App().getApp();
