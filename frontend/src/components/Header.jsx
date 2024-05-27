import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();

    if (location.pathname === '/') {
      window.location.reload(); // Reload the page if on the home page
    }
  };

  const userName = user ? user.username : '';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          NotCoursera
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/courses">Courses</Button>
        {isAuthenticated ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <UserAvatar name={userName} />
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout} component={Link} to="/">Logout</MenuItem>
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
