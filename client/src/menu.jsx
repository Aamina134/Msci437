import * as React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import history from './Navigation/history';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

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

    return (
        <ThemeProvider theme={lightTheme}>
            <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Button
                                key='1'
                                onClick={() => history.push('/Home')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
                            </Button>
                            <Button
                                key='2'
                                onClick={() => history.push('/Planning')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Route planning
                            </Button>
                            <Button
                                key='3'
                                onClick={() => history.push('/Analysis')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Route analysis
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
    )};

    export default App;