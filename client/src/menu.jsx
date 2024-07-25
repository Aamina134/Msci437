import * as React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import LogoImage from './MSCI 436 Final.png'; // Adjust the path as per your project structure

const Logo = styled('div')({
    width: 160,
    height: 32,
    backgroundColor: '#003686', // NetNation's primary color
    backgroundImage: `url(${LogoImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'font-family: Calibri',
    fontSize: 16,
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    marginRight: 8, // Adjust spacing between logo and buttons
});

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#ffffff"
        },
        primary: {
            main: '#003686',
            light: '#003686',
            dark: '#000000',
            background: '#ffffff'
        },
        secondary: {
            main: "#003686",
            light: '#000000',
            dark: '#38AED3'
        }
    },
    typography: {
        fontFamily: 'font-family: Calibri',
    }
});

const App = () => {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={lightTheme}>
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Logo />
                        <div>
                            <Button
                                key='2'
                                onClick={() => navigate('/')}
                                sx={{ color: '#003686', fontWeight: 'extra bold' }}
                            >
                                <Typography variant="button">Home</Typography>
                            </Button>

                            <Button
                                key='4'
                                onClick={() => navigate('/Analysis')}
                                sx={{ color: '#003686', fontWeight: 'extra bold' }}
                            >
                                <Typography variant="button">Route Analysis</Typography>
                            </Button>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default App;
