// Imports

import express from 'express';

import { PORT } from './config.js';

import cors from 'cors';

import http from 'http';

import { Server as SocketServer} from 'socket.io';

// Settings

const app = express();

const server = http.createServer(app);

const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
    
});

app.use(cors());

// Web Sockets

io.on('connection', (socket) => {
    
    socket.broadcast.emit('connected', {
        body: " Se Conecto",
        from: socket.id,
        type: "alert"
    });

    socket.on('message', (data) => {
        console.log(data);

        socket.broadcast.emit('message', {
            body: data,
            from: socket.id,
        });
    
    })

})

server.listen(PORT, () => {
    console.log("Server on PORT " + PORT);
})
