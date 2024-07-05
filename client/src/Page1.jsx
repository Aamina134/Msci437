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

    const faqData = [
        {
            question: 'Q: What criteria do reviewers have to meet in order to be selected?',
            answer: 'A: Reviewers must upload valid criedntials for Admin review.'
        },
        {
            question: 'Q: As a Student, am I allowed to schedule a meeting with my Reviewer?',
            answer: 'A: Yes, meetings can be scheduled through comments with your reviewer, and vice versa. '
        },
        {
            question: 'Q: Can a Reviewer be a reviewee as well?',
            answer: 'A: Yes, Reviewers can also have their documents reviewed by other Reveiwers!'
        },
        {
            question: 'Q: Is Can Do Co-op user-friendly?',
            answer: 'A: Yes, Can Do Co-op is designed to be user-friendly and easy to navigate for students seeking to improve their job search skills.'
        }
    ];

    return (
        <ThemeProvider theme={lightTheme}>
            <MenuBar />
            <Box
                sx={{
                    height: '100vh',
                    opacity: opacityValue,
                    overflow: 'scroll',
                    backgroundImage: `url(https://source.unsplash.com/_0sEjWfAK3Q)`,
                    backgroundSize: "cover"

                }}
            >
                <MainGridContainer
                    container
                    spacing={1}
                    style={{ maxWidth: '800px' }}
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
                    <Typography variant="h6" component="div">
                        random code on this page
                    </Typography>
                    <br />
                    {faqData.map((faq, index) => (
                        <Accordion key={index}>
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
                    <br />
                </MainGridContainer>
            </Box>
        </ThemeProvider>
    );
}

export default App;
