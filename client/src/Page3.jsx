import React, { useState } from 'react';
import Button from '@mui/material/Button';
import MenuBar from './menu'; // Adjust path as per your project structure
import Box from '@mui/material/Box';
import { GoogleMap, DirectionsService, DirectionsRenderer, LoadScript } from '@react-google-maps/api'; // Import necessary components from @react-google-maps/api
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

        const origin = { lat: 40.756795, lng: -73.954298 };
        const destination = { lat: 41.756795, lng: -76.954298 };

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
            center={{ lat: 40.756795, lng: -73.954298 }}
            zoom={13}
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
