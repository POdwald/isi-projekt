import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const success = await login(username, password);
      if (success) {
        navigateTo('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <TextField
            label="Username"
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
            disabled={loading} // Disable button when loading
          >
            {loading ? <CircularProgress size={24} /> : 'Login'} {/* Show loading indicator */}
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default LoginPage;
