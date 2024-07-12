import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import MenuBar from './menu'; // Adjust path as per your project structure
import Box from '@mui/material/Box';
import { GoogleMap, DirectionsService, DirectionsRenderer, LoadScript, Autocomplete } from '@react-google-maps/api';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { io } from "socket.io-client";

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: '#ffffff',
        },
        primary: {
            main: '#EEE2DC',
            light: '#f5eae6',
            dark: '#ffffff',
            background: '#ffffff',
        },
        secondary: {
            main: '#EDC7B7',
            light: '#ffffff',
            dark: '#ffffff',
        },
    },
});

const MapComponent = () => {
    const [directions, setDirections] = useState(null);

    const fetchDirections = () => {
        const directionsService = new window.google.maps.DirectionsService();

        const origin = { lat: 43.66611867064715, lng: -79.36844301380488 }; //Cabbage town
        const destination = { lat: 43.71211226493189, lng: -79.39393597358205 }; //Thornhills (probably)

        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    };

    useEffect(() => {
        fetchDirections();
    }, []);

    return (
        <GoogleMap
            mapContainerStyle={{ height: '100%', width: '100%' }}
            center={{ lat: 43.71211226493189, lng: -79.39393597358205 }}
            zoom={11}
        >
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    );
};

const AutocompleteInput = ({ placeholder, onPlaceChanged }) => {
    const autocompleteRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        if (autocompleteRef.current) {
            autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current.getPlace();
                console.log(`${placeholder} Place details:`, place);
                onPlaceChanged(place);
            });
        }
    }, [autocompleteRef.current, onPlaceChanged]);

    return (
        <Autocomplete
            onLoad={(autocomplete) => {
                console.log(`${placeholder} autocomplete loaded`, autocomplete);
                autocompleteRef.current = autocomplete;
            }}
        >
            <input
                type="text"
                placeholder={placeholder}
                ref={inputRef}
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "fixed",
                    left: placeholder === "Enter origin" ? "40%" : "60%",
                    top: "14%",
                    marginLeft: "-120px"
                }}
            />
        </Autocomplete>
    );
};
//---------------------------------------------------------------------------------------
function SafetyScoresPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [originPlace, setOriginPlace] = useState("place holder");
    const [destinationPlace, setDestinationPlace] = useState("placeholder");
    const [socket, setSocket] = React.useState(null);
    const [username, setUsername] = React.useState("");
    const [userMessage, setUserMessage] = React.useState("")

    React.useEffect(() => {
        const newSocket = io.connect("http://localhost:4001/"); //use this to emmit or listen to events whenever we want to
        setSocket(newSocket);

        newSocket.on("receive_message", (userMessages) =>{
            alert(JSON.stringify(userMessages));
        })
        return () => newSocket.close();
    }, []);

    const [data, setData] = React.useState("");

    const sendMessage = () => {
        console.log("button pressed");
        if (socket) {
            socket.emit("send_message", {
                message: userMessage,
                username: username
            });
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const go = () =>{
        setOriginPlace("updated");
        setDestinationPlace("updated");

    }

    return (
        <ThemeProvider theme={lightTheme}>
            <MenuBar />
            <Box
                sx={{
                    height: '88vh',
                    opacity: 0.9,
                    backgroundImage: `url(https://source.unsplash.com/_0sEjWfAK3Q)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="App">
                    <header className="App-header">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Update the message state as the user types
                            placeholder="Type your username..."
                        />
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)} // Update the message state as the user types
                            placeholder="Type your message..."
                        />
                        {<button onClick={sendMessage}>send message</button>}

                    </header>
                </div>
                <LoadScript
                    googleMapsApiKey="AIzaSyACR54EJurDEozVMCEc3Wut8SuseSCWl_g" // Replace with your Google Maps API key
                    libraries={['places']}
                >
                    <div style={{height: '100%', width: '100%', position: 'relative'}}>
                        <MapComponent/>
                        <div style={{
                            position: 'absolute',
                            top: '15%',
                            left: '7%',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={go}
                            >
                                Let's Go
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpen}
                            >
                                Show Safety Scores
                            </Button>
                            {isOpen && (
                                <div className="popup" style={{backgroundColor: 'white'}}>
                                    <h2>Safety Scores</h2>
                                    <p>(0 = completely unsafe, 100 = perfectly safe)</p>
                                    <p>Biking.............61</p>
                                    <p>Walking.............70</p>
                                    <p>Public Transit.....78</p>
                                    <p>Dangers occurred recently in this route's red zones:</p>
                                    <ul>
                                        <li>Stabbings</li>
                                        <li>Bike theft</li>
                                    </ul>
                                    <Button variant="contained" color="primary" onClick={handleClose}>
                                        Done
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <AutocompleteInput
                        placeholder="Enter origin"
                        onPlaceChanged={(place) => {
                            setOriginPlace(place);
                        }}

                    />

                    <AutocompleteInput
                        placeholder="Enter destination"
                        onPlaceChanged={(place) => {
                            setDestinationPlace(place);
                        }}
                    />
                </LoadScript>

            </Box>
            {originPlace && (
                <div>
                    <h2>Origin Place Details</h2>
                    <p>Name: {originPlace}</p>
                    <p>Address: {originPlace}</p>
                    <p>Latitude: {originPlace}</p>
                    <p>Longitude: {originPlace}</p>
                </div>
            )}
            {destinationPlace && (
                <div>
                    <h2>Destination Place Details</h2>
                    <p>Name: {destinationPlace}</p>
                    <p>Address: {destinationPlace}</p>
                    <p>Latitude: {destinationPlace}</p>
                    <p>Longitude: {destinationPlace}</p>
                </div>
            )}
        </ThemeProvider>
    );
}

export default SafetyScoresPopup;