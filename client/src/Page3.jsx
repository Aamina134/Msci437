import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import MenuBar from './menu'; // Adjust path as per your project structure
import Box from '@mui/material/Box';
import { GoogleMap, DirectionsService, DirectionsRenderer, LoadScriptNext, Autocomplete } from '@react-google-maps/api'; // Import necessary components from @react-google-maps/api
import MapComponent from './MapComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const cardsData = [
    { title: "Bike", value: "100", icon: <DirectionsBikeIcon />, bgColor: "#1e3a8a" },
    { title: "Transit", value: "80", icon: <DirectionsTransitIcon />, bgColor: "#2c5282" },
    { title: "Walking", value: "40", icon: <DirectionsWalkIcon />, bgColor: "#2b6cb0" },
];

const data01 = [
    { name: 'Safety', value: 100 },
    { name: 'Quality', value: 0 },
];

const data02 = [
    { name: 'Safety', value: 80 },
    { name: 'Quality', value: 20 },
];
const data03 = [
    { name: 'Safety', value: 40 },
    { name: 'Quality', value: 60 },
];

const pieData = [data01, data02, data03];

//#5075AC

const COLORS = ["#ADD8E6", "#34495E", "#7F8C8D", "#BDC3C7", "#95A5A6", "#E74C3C", "#C0392B", "#2980B9", "#3498DB", "#16A085"

];
const renderCustomLabel = ({ name }) => name;


const StyledCardComponent = () => {
    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Grid container spacing={2}>
                {cardsData.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ boxShadow: 10, backgroundColor: card.bgColor, color: 'white', borderRadius: 2 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                                            {card.icon}
                                        </Box>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold',marginTop: 3 }}>
                                            {card.value}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {card.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            Score out of 100
                                        </Typography>
                                    </Box>
                                    <ResponsiveContainer width="100%" height={160}>
                                        <PieChart>
                                            <Pie
                                                dataKey="value"
                                                isAnimationActive={true}
                                                data={pieData[index]}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={60}
                                                innerRadius={40}
                                                fill="#8884d8"
                                            >
                                                {pieData[index].map((entry, i) => (
                                                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </Box>

                            </CardContent>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: '#ffffff',
        },
        primary: {
            main: '#000053',
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
];

const MapComponent2 = () => {
    const [directions, setDirections] = useState(null);

    const fetchDirections = () => {
        const directionsService = new window.google.maps.DirectionsService();

        const origin = { lat: 43.66611867064715, lng: -79.36844301380488 }; // Cabbage town
        const destination = { lat: 43.71211226493189, lng: -79.39393597358205 }; // Thornhills (probably)

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

function SafetyScoresPopup() {
    const [scoreOne, setScoreOne] = useState(90);
    const [scoreTwo, setScoreTwo] = useState(75);
    const [scoreThree, setScoreThree] = useState(36);

    const [isOpen, setIsOpen] = useState(false);
    const [originPlace, setOriginPlace] = useState();
    const [destinationPlace, setDestinationPlace] = useState();

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <link rel="stylesheet" type="text/css" href="./style.css" />
            <MenuBar />
            <Box
                sx={{
                    height: '88vh',
                    opacity: 0.9,
                    backgroundImage: `url(https://source.unsplash.com/_0sEjWfAK3Q)`,
                    backgroundSize: 'cover',
                }}
            >
                <div style={{ height: '100%', width: '100%', position: 'relative'}}>
                    <MapComponent /> 

                    <div style={{
                        position: 'absolute',
                        top: '15%',
                        left: '7%',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
                    }}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleOpen}
                        >
                            Show Safety Scores
                        </Button>
                        {isOpen && (
                            <div className="popup" style={{ backgroundColor: 'white' }}>
                                <StyledCardComponent/>
                                <Button variant="contained" color="primary" onClick={handleClose}>
                                    Done
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Box>
            {originPlace && (
                <div>
                    <h2>Origin Place Details</h2>
                    <p>Name: {originPlace.name}</p>
                    <p>Address: {originPlace.formatted_address}</p>
                    <p>Latitude: {originPlace.geometry.location.lat()}</p>
                    <p>Longitude: {originPlace.geometry.location.lng()}</p>
                </div>
            )}
            {destinationPlace && (
                <div>
                    <h2>Destination Place Details</h2>
                    <p>Name: {destinationPlace.name}</p>
                    <p>Address: {destinationPlace.formatted_address}</p>
                    <p>Latitude: {destinationPlace.geometry.location.lat()}</p>
                    <p>Longitude: {destinationPlace.geometry.location.lng()}</p>
                </div>
            )}


        </ThemeProvider>
    );
}

export default SafetyScoresPopup;