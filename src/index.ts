import http from 'http'
import app from './app'

const server = http.createServer(app);
const PORT = process.env.PORT || 4100;


server.listen(PORT,() =>{
    console.log(`Server on http://localhost:${PORT}`);
});