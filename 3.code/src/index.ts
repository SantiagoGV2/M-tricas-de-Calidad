import app from './app';
import { ServerBootstrap } from './bootstrap/server-bootstrap';  

const server = new ServerBootstrap(app);
server.init();