import { CircularProgress, Container, Typography, Box } from '@mui/material';

const LoadingSpinner = () => (
    <>
        <Container sx={{ mb: 4 }}>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>
                    Loading...
                </Typography>
            </Box>
        </Container>
    </>
);

export default LoadingSpinner;
