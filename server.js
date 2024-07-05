//We import express for use
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

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


//Initialize our web-app on the selected port
httpServer.listen(port);

/*app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);*/


