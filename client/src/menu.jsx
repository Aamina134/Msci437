import * as React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#ffffff"
        },
        primary: {
            main: '#38AED3',
            light: '#003686',
            dark: '#000000',
            background: '#ffffff'
        },
        secondary: {
            main: "#38AED3",
            light: '#000000',
            dark: '#38AED3'
        }
    },
    typography: {
        fontFamily: 'Roboto, sans-serif', 
    }
});

const App = () => {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={lightTheme}>
            <AppBar position="static" sx={{ background: 'linear-gradient(to right, #38AED3, #003686)' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Button
                            key='1'
                            onClick={() => navigate('/')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            key='2'
                            onClick={() => navigate('/Planning')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Route planning
                        </Button>
                        <Button
                            key='3'
                            onClick={() => navigate('/Analysis')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Route analysis
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default App;
