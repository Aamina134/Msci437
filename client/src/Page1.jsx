import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import MenuBar from './menu.jsx';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react'; // Import useState hook for managing state
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#0B7285', // NetNation's primary color
        },
        secondary: {
            main: '#0B7285', // NetNation's secondary color
        },
        background: {
            default: ' ', // Light gray background
            custom: '#003686', // Custom background color
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}));

const App = () => {

    const backgroundImageUrl = 'https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
                    background: 'white', // Use custom background color
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <MainGridContainer
                    container
                    spacing={2}
                    style={{ maxWidth: '800px' }}
                    direction="column"
                    alignItems="left"
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        align="left"
                        gutterBottom
                        style={{
                            color: '#003686', // Text color on custom background
                            fontWeight: 'bold',
                            letterSpacing: '0.01em',
                        }}
                    >
                        Safe Route DSS
                    </Typography>
                    
                    <img
                        src="https://plus.unsplash.com/premium_photo-1677343210548-62729756633e?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image URL
                        alt="Map Image"
                        style={{
                            width: '20%',
                            height: '10%',
                            borderRadius: '8%', // Makes the image circular
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
                        }}
                    />
                    <p></p>
                    
                    {faqData.map((faq, index) => (
                        <Accordion key={index} sx={{ width: '100%', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`faq-${index}-content`}
                                id={`faq-${index}-header`}
                            >
                                <Typography variant="h6" style={{ color: '#003686' }}>
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: 'white', color: '#555', padding: '16px' }}>
                                <Typography>
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}

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
