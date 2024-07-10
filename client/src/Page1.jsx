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
    textAlign: 'left', // Left-align contents within the Grid container
}));

const StyledButton = styled(Button)({
    height: '10vh',
    color: '#fff',
    fontSize: '16px',
    backgroundColor: '#003686', // Updated button color
    borderRadius: '8px', // Make the button circular
    paddingLeft: '16px', // Add space for icon
    paddingRight: '16px', // Add space for icon
    position: 'absolute',
    bottom: '4%',
    right: '1%', // Adjusted position to the right side
    zIndex: 1,
    fontWeight: 'bold', // Make the text bold
    '&:hover': {
        backgroundColor: '#38AED3', // Darker shade on hover
    },
    '& .MuiButton-endIcon': {
        display: 'none', // Hide the end icon (SendIcon)
    },
});


const FullWidthImage = styled('img')({
    width: '100%', // Make image occupy full width of its container
    height: 'auto', // Automatically adjust height while maintaining aspect ratio
    maxHeight: '40vh', // Set maximum height to prevent excessive stretching
    borderRadius: '16px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    objectFit: 'cover', // Maintain aspect ratio and cover entire space
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

    const backgroundImageUrl = 'https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
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
                    spacing={2}
                    style={{ maxWidth: '960px', position: 'relative' }}
                    direction="column"
                    alignItems="center"
                >
                    <Typography
                        variant="h3"
                        component="h2"
                        align="left"
                        gutterBottom
                        style={{
                            color: '#003686',
                            fontWeight: 'bold',
                            letterSpacing: '0.005em',
                            marginTop: '4rem', // Increase padding above the title
                        }}
                    >
                        Welcome to Safe Route!
                    </Typography>
                    
                    <div style={{ position: 'relative', width: '100%', marginTop: '2rem' }}>
                        <FullWidthImage
                            src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Map Image"
                        />
                        <StyledButton onClick={() => navigate('/Planning')} endIcon={<SendIcon />}>
                            Start Planning Your Route!
                        </StyledButton>
                    </div>

                    <div style={{ width: '100%', marginTop: '2rem' }}>
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
                    
                    <br />
                </MainGridContainer>
            </Box>
        </ThemeProvider>
    );
}

export default App;
