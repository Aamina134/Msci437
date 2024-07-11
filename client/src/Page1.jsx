import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import MenuBar from './menu.jsx';
import LogoImage from './MSCI 436 Final.png'; // Adjust the path as per your project structure
import BoyOnBike from './Boy on bike.png';

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
        fontFamily: 'Calibri, sans-serif',
    },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
    textAlign: 'left', // Left-align contents within the Grid container
}));

const StyledButton = styled(Button)({
    height: '4vh',
    color: 'white',
    fontSize: '16px',
    backgroundColor: '#003686', // Updated button color
    borderRadius: '8px', // Make the button circular
    paddingLeft: '8px', // Add space for icon
    paddingRight: '8px', // Add space for icon
    marginTop: '1rem', // Space between subtitle and button
    fontWeight: 'bold', // Make the text bold
    '&:hover': {
        backgroundColor: 'white', // Darker shade on hover
        color: '#003686'
    },
    '& .MuiButton-endIcon': {
        display: 'none', // Hide the end icon (SendIcon)
    },
});

const FullWidthImage = styled('img')({
    width: '60%', // Make image occupy full width of its container
    height: 'auto', // Automatically adjust height while maintaining aspect ratio
    maxHeight: 'vh', // Set maximum height to prevent excessive stretching
    objectFit: 'cover', // Maintain aspect ratio and cover entire space
    objectPosition: 'top', // Ensure top part of the image is visible
    margin: '0', // Remove all margins
    display: 'block', // Ensure the image behaves as a block element
    position: 'relative', // Ensure positioning context for absolute button
});


// Custom styled components for Accordion
const StyledAccordion = styled(Accordion)({
    width: '100%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    marginBottom: '16px',
    '&:before': {
        display: 'none',
    },
});

const StyledAccordionSummary = styled(AccordionSummary)({
    backgroundColor: '#f0f0f0', // Light background color
    borderBottom: '1px solid #ddd',
    minHeight: '56px', // Adjust height as needed
    '&.Mui-expanded': {
        minHeight: '56px', // Adjust height when expanded
    },
});

const StyledAccordionDetails = styled(AccordionDetails)({
    backgroundColor: '#fff',
    color: '#555',
    padding: '16px',
});

const App = () => {
    const navigate = useNavigate();

    const faqData = [
        {
            question: 'What does Safe Route do?',
            answer: 'Safe Route calculates the safety level of your route given the time & transportation method.',
        },
        {
            question: 'How does Safe Route keep me safe?',
            answer: 'Our safety score can help you decide whether or not to embark on a given route. This is not a replacement for good judgement.',
        },
        {
            question: 'What if something does happen along my route?',
            answer: 'Safe Route cannot aid you in emergency situations. Please call 911 in the case of an emergency! Safe Route takes no legal responsibility for any harm or damage caused to users along the route.',
        },
        {
            question: 'I need help, how can I contact Safe Route?',
            answer: 'Please contact us at 416-555-NEEDHELP or at SafeRouteMail@NotReal.com.',
        },
    ];

    return (
        <ThemeProvider theme={lightTheme}>
            <MenuBar />
            <Box
                sx={{
                    height: '100vh',
                    background: 'white', // Use custom background color
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative', // Ensure positioning context for absolute button
                }}
            >
                <MainGridContainer
                    container
                    spacing={2}
                    style={{ maxWidth: '960px', position: 'relative' }}
                    direction="row"
                    alignItems="left"
                    justifyContent="left"
                >
                    <Grid item xs={12} md={6} style={{ textAlign: 'left' }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            align="left" // Center align the title
                            gutterBottom
                            style={{
                                color: '#003686',
                                fontWeight: 'bold',
                                letterSpacing: '0.005em',
                                marginTop: '4rem', // Increase padding above the title
                            }}
                        >
                            <span>Welcome to </span>
                            <img src={LogoImage} alt="Safe Route Logo" style={{width: '240px', height: 'auto' }} />
                        </Typography>

                        <Typography
                            variant="subtitle1" // Use subtitle variant for smaller text
                            align="left" // Center align the subtitle
                            gutterBottom
                            style={{
                                color: '#003686',
                                letterSpacing: '0.005em',
                            }}
                        >
                            We'll help you get to where you need to go, as safely as possible
                        </Typography>

                        <StyledButton onClick={() => navigate('/Planning')} endIcon={<SendIcon />}>
                            Start Planning Your Route!
                        </StyledButton>
                    </Grid>

                    <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                        <FullWidthImage
                            src={BoyOnBike}
                            alt="Map Image"
                        />
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: '2rem' }}>
                        <div style={{ width: '100%' }}>
                            {faqData.map((faq, index) => (
                                <StyledAccordion key={index}>
                                    <StyledAccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`faq-${index}-content`}
                                        id={`faq-${index}-header`}
                                    >
                                        <Typography variant="h6" style={{ color: '#003686' }}>
                                            {faq.question}
                                        </Typography>
                                    </StyledAccordionSummary>
                                    <StyledAccordionDetails>
                                        <Typography>
                                            {faq.answer}
                                        </Typography>
                                    </StyledAccordionDetails>
                                </StyledAccordion>
                            ))}
                        </div>
                    </Grid>
                </MainGridContainer>
            </Box>
        </ThemeProvider>
    );
}

export default App;
