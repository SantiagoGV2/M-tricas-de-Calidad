import app from './app';
import http from 'http';
//crear una instancia de express
 
const server  = http.createServer(app);
const PORT = process.env.PORT || 4100
 
 
server.listen(PORT,() => {
    console.log(`Server on http://localhost:${PORT}`);
});
 