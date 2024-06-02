import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Box, Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import ChangeEmailForm from '../components/ChangeEmailForm';
import ChangePasswordForm from '../components/ChangePasswordForm';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();
  const { user } = useUser();
  const navigateTo = useNavigate();
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChangePassword = () => {
    setShowChangePassword(true);
    setShowChangeEmail(false);
  };

  const handleChangeEmail = () => {
    setShowChangeEmail(true);
    setShowChangePassword(false);
  };

  const handleCreateCourse = () => {
    navigateTo('/create-course/');
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
            <Button variant="contained" onClick={handleChangePassword} sx={{ display: 'block', mt: 1 }}>
              Change Your Password
            </Button>
            <Button variant="contained" onClick={handleChangeEmail} sx={{ display: 'block', mt: 1 }}>
              Change Your Email
            </Button>
            <Button variant="contained" onClick={handleCreateCourse} sx={{ display: 'block', mt: 1 }}>
              Create a course
            </Button>
            {showChangePassword && <ChangePasswordForm />}
            {showChangeEmail && <ChangeEmailForm />}
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
