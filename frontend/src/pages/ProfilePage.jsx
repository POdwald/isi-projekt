import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Box, Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <>
      <Header />
      <Container>
        {isAuthenticated && user ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1" gutterBottom>
              Username: {user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {user.email}
            </Typography>
            <Button variant="contained" onClick={handleChangePassword}>
              Change Your Password
            </Button>
          </Box>
        ) : (
          <Typography variant="body1" gutterBottom>
            Please log in to view your profile.
          </Typography>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ProfilePage;
