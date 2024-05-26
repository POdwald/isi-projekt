import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Box, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <div>
        <Header />
        <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the NotCoursera
          </Typography>
          <Typography variant="body1">
            Explore our courses and start learning today!
          </Typography>
        </Box>
        </Container>
        <Footer />
    </div>
  );
};

export default HomePage;
