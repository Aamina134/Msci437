import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import MenuBar from './menu'; // Adjust path as per your project structure
import Box from '@mui/material/Box';
import { GoogleMap, DirectionsService, DirectionsRenderer, LoadScript, Autocomplete } from '@react-google-maps/api'; // Import necessary components from @react-google-maps/api
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PieChart from './pie'

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

const data = [
    {
        "id": "c",
        "label": "c",
        "value": 300,
        "color": "hsl(56, 70%, 50%)"
    },
    {
        "id": "go",
        "label": "go",
        "value": 553,
        "color": "hsl(297, 70%, 50%)"
    },
    {
        "id": "rust",
        "label": "rust",
        "value": 123,
        "color": "hsl(111, 70%, 50%)"
    }
]

const MapComponent = () => {
    const [directions, setDirections] = useState(null);

    // Fetch directions logic
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
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.TRANSIT,
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

    // Call fetchDirections when component mounts
    React.useEffect(() => {
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

function SafetyScoresPopup() {

    const [scoreOne, setScoreOne] = useState(90);
    const [scoreTwo, setScoreTwo] = useState(75);
    const [scoreThree, setScoreThree] = useState(36);



    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    //The following section is for the search bar
    const autocompleteRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        if (autocompleteRef.current) {
            autocompleteRef.current.addListener('place_changed', () => {
              const place = autocompleteRef.current.getPlace();
              console.log('Place details:', place);
            });
          }
    })

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
                <LoadScript
                    googleMapsApiKey="AIzaSyACR54EJurDEozVMCEc3Wut8SuseSCWl_g" // Replace with your Google Maps API key
                    libraries={['places']}
                >
                    <div style={{ height: '100%', width: '100%' }}>
                        <MapComponent />
                    </div>

                    <Autocomplete
                    onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                    >
                        <input
                            type="text" //This auto complete section is for the area search bar.
                            placeholder="Enter a place"
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
                            position: "absolute",
                            left: "50%",
                            marginLeft: "-120px"
                            }}
                        />
                    </Autocomplete>
                </LoadScript>
            </Box>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Show Safety Scores
            </Button>
            {isOpen && (
                <div className="popup">
                    <h2>Safety Scores</h2>
                    <p>(0 = completely unsafe, 100 = perfectly safe)</p>
                    <p>Biking.............61</p>
                    <Box height ="20vh">
                        <PieChart
                            data={data}
                        />
                    </Box>
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
        </ThemeProvider>
    );
}

export default SafetyScoresPopup;
