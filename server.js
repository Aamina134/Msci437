//We import express for use
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
const { spawnSync } = require('child_process');
const { readFile } = require('fs/promises');
const { appendFile } = require('fs/promises');
const { join } = require('path');

// Express app
const app = express();
app.use(cors());

// Looking for a local port to host our web application
const port = process.env.PORT || 4001;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

// Object
const userMessages = {};
/*
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message" , (data) => {
        console.log(data.message + "backend-received data from front end");
        if (data.message !== ""){
            userMessages[data.username]=data.message;
        }
        console.log(JSON.stringify(userMessages));

        socket.emit("receive_message", userMessages[data.username])
    });

});
*/


app.get("/", async (req, res, next)=>{
    bigBooleanTable = []
    timeOfDay = 'Day'
    ModeOfTransportation = 'Car'

    let dataToSend;
    const python = spawn('python', ['script.py', bigBooleanTable, timeOfDay, ModeOfTransportation]);

    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
    });

});
//Initialize our web-app on the selected port
httpServer.listen(port);

/*app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);*/


