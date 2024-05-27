import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Box, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ marginBottom: '48px' }}>
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
    </>
  );
};

export default HomePage;
