import React from 'react';
import { Avatar } from '@mui/material';

const UserAvatar = ({ name }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '';

  return (
    <Avatar>{initial}</Avatar>
  );
};

export default UserAvatar;