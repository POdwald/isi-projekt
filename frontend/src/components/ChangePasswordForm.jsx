import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { api } from '../utils/apiService';

const ChangePasswordForm = () => {
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/change-password/', { password });
            setSuccess(true);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                type="password"
                label="New Password"
                value={password}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Change Password
            </Button>
            {success && <Typography>Password changed successfully!</Typography>}
            {error && <Typography color="error">{error}</Typography>}
        </form>
    );
};

export default ChangePasswordForm;
