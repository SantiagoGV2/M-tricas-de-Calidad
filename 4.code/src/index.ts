import app from './app';
import { ServerBootstrap } from './bootstrap/server-bootstrap';  

const server = new ServerBootstrap(app);
/** 
 * async - await
*/
const start = async ()=>{
    try{
        const instances = [server.init()];
        await Promise.all(instances);
    } catch (error){
        console.error("Error starting server:",error);
    }
}

start();
