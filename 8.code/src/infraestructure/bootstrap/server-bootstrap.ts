import http from 'http';
import express from 'express';
import envs from "../config/enviroment-vars";

export class ServerBootstrap {
    //atributos - propiedades -caracteristicas
    private app!: express.Application;//encapulacion
    //constructor
    constructor(app: express.Application) {
        this.app = app;
    }

    init(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            const PORT = envs.PORT || 4100;
            server.listen(PORT)
            .on("listening", ()=>{
                console.log(`Server is running on port ${PORT}`);
                resolve(true)
            })
            .on("erro", (err)=>{
                console.log(`Error strating server on port ${err}`);
                reject(false);
            })
        });
    }
}