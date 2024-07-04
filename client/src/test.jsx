import React from "react";
//import logo from './logo.svg';
import './App.css';
//import axios from "axios";
import { io } from "socket.io-client";
import { useEffect } from "react";



function App() {

    //let socket = null;
    const [socket, setSocket] = React.useState(null);
    const [username, setUsername] = React.useState("");
    const [userMessage, setUserMessage] = React.useState("");

    React.useEffect(() => {
        const newSocket = io.connect("http://localhost:4001/"); //use this to emmit or listen to events whenever we want to
        setSocket(newSocket);

        newSocket.on("receive_message", (userMessages) =>{
            alert(JSON.stringify(userMessages));
        })

    }, []);

    const [data, setData] = React.useState("");

    const sendMessage =() => {
        console.log("button pressed");
        socket.emit("send_message", {
            message:userMessage,
            username:username
        });
    };

    return (

        <div className="App">
            <header className="App-header">
                <input
                    type="text"
                    value = {username}
                    onChange={(e) => setUsername(e.target.value)} // Update the message state as the user types
                    placeholder="Type your username..."
                />
                <input
                    type="text"
                    value = {userMessage}
                    onChange={(e) => setUserMessage(e.target.value)} // Update the message state as the user types
                    placeholder="Type your message..."
                />
                {<button onClick={sendMessage}>send message</button>}

            </header>
        </div>
    );
}

export default App;