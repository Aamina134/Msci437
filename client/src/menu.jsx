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
            main: '#EEE2DC',
            light: '#f5eae6',
            dark: '#000000',
            background: '#ffffff'
        },
        secondary: {
            main: "#EDC7B7",
            light: '#000000',
            dark: '#EDC7B7'
        },
    },
});

const App = () => {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={lightTheme}>
            <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #5C7AEA, #AB83F8)' }}>
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
