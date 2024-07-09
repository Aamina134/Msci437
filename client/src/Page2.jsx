import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import App from "../../sample/solution/src/app"
//import history from '../Navigation/history';
import MenuBar from './menu.jsx';



const opacityValue = 0.9;

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

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))

const Apps = () => {

    return (
        <ThemeProvider theme={lightTheme} style={{height: '100vh', width: '100vh'}}>
            <MenuBar />
            <Box
                sx={{
                    height: '88vh',
                    opacity: opacityValue,
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
    );
}

export default Apps;
