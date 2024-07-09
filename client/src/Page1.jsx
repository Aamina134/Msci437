import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import history from '../Navigation/history';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import MenuBar from './menu.jsx';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';


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

const App = () => {

    //For the extra button mid page.
    const navigate = useNavigate();

    const faqData = [
        {
            question: 'Q: What does Safe Route do?',
            answer: 'A: Safe Route calculates the safety level of your route given the time & transportation method.'
        },
        {
            question: 'Q: How does Safe Route keep me safe?',
            answer: 'A: Our safety score can help you decide whether or not to embark on a given route. This is not a replacement for good judgement. '
        },
        {
            question: 'Q: What if something does happen along my route?',
            answer: 'A: Safe Route cannot aid you in emergency situations. Please call 911 in the case of an emergency! Safe Route takes no legal responsibility for any harm or damage caused to users along the route.'
        },
        {
            question: 'Q: I need help, how can I contact Safe Route?',
            answer: 'A: Please contact us at 416-555-NEEDHELP or at SafeRouteMail@NotReal.com.'
        }
    ];


    return (
        <ThemeProvider theme={lightTheme}>
            <MenuBar />
            <Box
                sx={{
                    height: '100vh',
                    opacity: opacityValue,
                    //overflow: 'scroll',
                    backgroundImage: `url(https://source.unsplash.com/_0sEjWfAK3Q)`,
                    backgroundSize: "cover"

                }}
            >
                <MainGridContainer
                    //container
                    spacing={1}
                    //style={{ maxWidth: '800px' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Typography
                        variant="h1"
                        component="h1"
                        align="center"
                        gutterBottom
                        style={{
                            color: '#000',
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            textShadow: '1px 1px #ccc',
                            letterSpacing: '0.1em',
                            lineHeight: '1.2',
                        }}
                    >
                        Safe Route DSS
                    </Typography>
                    <Typography marginBottom="50px" align="center" variant="h6" component="div">
                        The smartest way to plan your journey.
                    </Typography>
                    <div align="center">
                        <Button variant="outlined" onClick={() => navigate('/Planning')} borderColor="#005cbf" endIcon={<SendIcon />} style={{height: '10vh', width: '25vh', color: 'blue', fontSize: '20px'}}>Start Planning</Button>
                    </div>
                    <Typography marginTop="50px" align="center" variant="h6" component="div">
                        Some commonly asked questions:
                    </Typography>
                    <br />
                    <div align="center">
                        {faqData.map((faq, index) => (
                            <Accordion key={index} style={{ maxWidth: '800px' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`faq-${index}-content`}
                                    id={`faq-${index}-header`}
                                >
                                    <Typography variant="h6" component="div">
                                        {faq.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails  sx={{  backgroundColor: '#2196f3', color: '#fff'  }}>
                                    <Typography>
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                    
                    <br />
                </MainGridContainer>
            </Box>
        </ThemeProvider>
    );
}

export default App;
