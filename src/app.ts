//endpoint: direccion del recurso que se va a consumir

import express, {Request, Response} from 'express'

//crar una instancia de express
const app = express();
//gestion rutas-endpoints

app.get('/', (request:Request, response:Response) => {
    response.send("Hola estudiantes de Uniempresarial")
});

app.get('/check', (request:Request, response:Response) => {
    response.send("I'm ready")
});

export default app;
