import * as React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const Logo = () => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'white',
            color: '#0B7285',
            fontWeight: 'bold',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 16,
        }}
    >
        SR
    </Box>
);

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
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Logo />
                        <Button
                            key='2'
                            onClick={() => navigate('/')}
                            sx={{ my: 2, color: '#38AED3', display: 'block', marginLeft: 1 }}
                        >
                            <Typography variant="button" fontWeight="bold">Home</Typography>
                        </Button>
                        <Button
                            key='3'
                            onClick={() => navigate('/Planning')}
                            sx={{ my: 2, color: '#38AED3', display: 'block' }}
                        >
                            <Typography variant="button" fontWeight="bold">Route Planning</Typography>
                        </Button>
                        <Button
                            key='4'
                            onClick={() => navigate('/Analysis')}
                            sx={{ my: 2, color: '#38AED3', display: 'block' }}
                        >
                            <Typography variant="button" fontWeight="bold">Route Analysis</Typography>
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default App;
