import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import MenuBar from './menu'; // Adjust path as per your project structure
import Box from '@mui/material/Box';
import { GoogleMap, DirectionsRenderer, Autocomplete } from '@react-google-maps/api'; // Import necessary components from @react-google-maps/api
import MapComponent from './MapComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const initialCardsData = [
    { title: "Bike", values: [100, 90, 80, 70], icon: <DirectionsBikeIcon />, bgColor: "#1e3a8a" },
    { title: "Transit", values: [80, 75, 70, 65], icon: <DirectionsTransitIcon />, bgColor: "#2c5282" },
    { title: "Walking", values: [40, 35, 30, 25], icon: <DirectionsWalkIcon />, bgColor: "#2b6cb0" },
];

const COLORS = ["#ADD8E6", "#34495E", "#7F8C8D", "#BDC3C7", "#95A5A6", "#E74C3C", "#C0392B", "#2980B9", "#3498DB", "#16A085"];
const renderCustomLabel = ({ name }) => name;

const getRandomValue = (values) => values[Math.floor(Math.random() * values.length)];

const StyledCardComponent = ({ cardsData }) => {
    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Grid container spacing={2}>
                {cardsData.map((card, index) => {
                    const pieData = [
                        { name: 'Safety', value: card.value },
                        { name: 'Quality', value: 100 - card.value },
                    ];

                    return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ boxShadow: 10, backgroundColor: card.bgColor, color: 'white', borderRadius: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                                                {card.icon}
                                            </Box>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 3 }}>
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
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={60}
                                                    innerRadius={40}
                                                    fill="#8884d8"
                                                >
                                                    {pieData.map((entry, i) => (
                                                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
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

function SafetyScoresPopup() {
    const [cardsData, setCardsData] = useState(
        initialCardsData.map((card) => ({
            ...card,
            value: getRandomValue(card.values),
        }))
    );
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setCardsData(
            initialCardsData.map((card) => ({
                ...card,
                value: getRandomValue(card.values),
            }))
        );
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
                            <div className="popup" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: 16, borderRadius: 8 }}>
                                <StyledCardComponent cardsData={cardsData}/>
                                <Button variant="contained" color="primary" onClick={handleClose}>
                                    Done
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Box>
        </ThemeProvider>
    );
}

export default SafetyScoresPopup;
