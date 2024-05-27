import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Box, Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem('token');
          const profileData = await fetchUserProfile(token);
          console.log(user)
        } catch (error) {
          console.log('Error fetching user data.', error)
        }
      }
    };

    loadUserProfile();
  }, [isAuthenticated]);

  const handleChangePassword = () => {
    // Redirect to change password page
    navigate('/change-password');
  };

  return (
    <>
      <Header />
      <Container>
        {isAuthenticated && profileData && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1" gutterBottom>
              Username: {profileData.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {profileData.email}
            </Typography>
            <Button variant="contained" onClick={handleChangePassword}>
              Change Your Password
            </Button>
          </Box>
        )}
        {!isAuthenticated && (
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
