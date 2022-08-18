import express from 'express'
import morgan from 'morgan';
import { Server as socketServer } from 'socket.io';
import http from 'http'
import cors from 'cors';

const appExpress = express()
const serverHttp = http.createServer(appExpress)
const io = new socketServer(serverHttp,{
    cors: {
        origin: 'http://localhost:5173'
    }
})

appExpress.use(cors())
appExpress.use(morgan('dev'))

io.on('connection', (socket) => {
    console.log(`A user connected with id ${socket.id}`);
    socket.on('click', (message)=>{
        console.log(message);
        socket.broadcast.emit('click',message)
    })
})

serverHttp.listen(4000,()=>{
    console.log('Server: http://localhost:4000');
})