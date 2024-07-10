import React from 'react';
import Button from '@mui/material/Button';
import MenuBar from "./menu";
import Box from "@mui/material/Box";
import App from "../../sample/solution/src/app";
import {createTheme, ThemeProvider} from "@mui/material/styles";

function SafetyScoresPopup() {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const lightTheme = createTheme({
        palette: {
            type: 'light',
            background: {
                default: "#ffffff"
            },
            primary: {
                main: '#EEE2DC',
                light: '#f5eae6',
                dark: '#ffffff',
                background: '#ffffff'
            },
            secondary: {
                main: "#EDC7B7",
                light: '#ffffff',
                dark: '#ffffff'
            },
        },
    });

    return (
        <div>
            <ThemeProvider theme={lightTheme} style={{height: '100vh', width: '100vh'}}>
                <MenuBar />
                <Box
                    sx={{
                        height: '88vh',
                        opacity: 0.9,
                        //overflow: 'scroll',
                        backgroundImage: `url(https://source.unsplash.com/_0sEjWfAK3Q)`,
                        backgroundSize: "cover"
                    }}
                >
                    <div style={{height: '100%', width: '100%'}}>
                        <App/>
                    </div>
                </Box>
            </ThemeProvider>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Show Safety Scores
            </Button>
            {isOpen && (
                <div className="popup">
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
    );
}

export default SafetyScoresPopup;
