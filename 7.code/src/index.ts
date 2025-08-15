import app from './infraestructure/web/app';
import { ServerBootstrap } from './infraestructure/bootstrap/server-bootstrap';

const server = new ServerBootstrap(app);
/** 
 * async - await

const start = async ()=>{
    try{
        const instances = [server.init()];
        await Promise.all(instances);
    } catch (error){
        console.error("Error starting server:",error);
    }
}

start();
*/
(
    async () => {
        try {
            const instances = [server.init()];
            await Promise.all(instances);
        } catch (error) {
            console.error("Error starting server:", error);
        }
    }
)();