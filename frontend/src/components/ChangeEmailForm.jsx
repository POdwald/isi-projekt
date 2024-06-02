import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { api } from '../utils/apiService';

const ChangeEmailForm = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/change-email/', { email });
            setSuccess(true);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                type="email"
                label="New Email"
                value={email}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Change Email
            </Button>
            {success && <Typography>Email changed successfully!</Typography>}
            {error && <Typography color="error">{error}</Typography>}
        </form>
    );
};

export default ChangeEmailForm;
