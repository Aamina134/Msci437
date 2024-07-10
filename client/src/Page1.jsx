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

    const backgroundImageUrl = 'https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const faqData = [
        {
            question: 'Q: What criteria do reviewers have to meet in order to be selected?',
            answer: 'A: Reviewers must upload valid credentials for Admin review.',
        },
        {
            question: 'Q: As a Student, am I allowed to schedule a meeting with my Reviewer?',
            answer: 'A: Yes, meetings can be scheduled through comments with your reviewer, and vice versa.',
        },
        {
            question: 'Q: Can a Reviewer be a reviewee as well?',
            answer: 'A: Yes, Reviewers can also have their documents reviewed by other Reveiwers!',
        },
        {
            question: 'Q: Is Can Do Co-op user-friendly?',
            answer: 'A: Yes, Can Do Co-op is designed to be user-friendly and easy to navigate for students seeking to improve their job search skills.',
        },
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
                </MainGridContainer>
            </Box>
        </ThemeProvider>
    );
}

export default App;
