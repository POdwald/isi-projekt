import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { login as loginService } from '../utils/authService';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const success = await loginService(username, password);
      if (success) {
        login(username, password); // Pass email and password separately
        navigateTo('/'); // Redirect to home page after successful login
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ marginBottom: '48px' }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <form>
            <TextField
              label="Email or Username"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              sx={{ marginTop: '20px' }}
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default LoginPage;
