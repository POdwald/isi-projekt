import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, TextField, Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { api } from '../utils/apiService';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await api.post('signup', {
        username,
        email,
        password,
      });
      setOpen(true);
    } catch (err) {
      console.error('Error registering user', err);
      setError('Error registering user');
    }
  };
  
  const handleClose = () => {
    setOpen(false);
    // Redirect to login page or home page if needed
    // For example: window.location.href = '/login';
  };

  return (
    <>
      <Header/>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </form>
        </Box>
      </Container>
      <Footer/>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Signup Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have signed up successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => window.location.href = '/login'} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignupPage;
