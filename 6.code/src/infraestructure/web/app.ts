//endpoint: direccion del recurso que se va a consumir

import express, {Request, Response} from 'express';
class App{
    private app!: express.Application;
    constructor(){
        this.app = express();
        this.routes();
    }

    private routes(): void{

        this.app.get('/', (request:Request, response:Response) => {
            response.send("Hola estudiantes de Uniempresarial")
        });

        this.app.get('/check', (request:Request, response:Response) => {
            response.send("I'm ready")
        });
    }
    getApp(){
        return this.app;
    }
}


export default new App().getApp();
