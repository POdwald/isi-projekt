import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        &copy; 2024 NotCoursera. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;