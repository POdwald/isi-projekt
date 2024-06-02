import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../utils/apiService';
import { Typography, Grid, Paper, Divider, Button, Container, Box, CircularProgress } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const CourseDetailPage = () => {
    const { courseSlug } = useParams();
    const { isAuthenticated } = useAuth();
    const navigateTo = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await api.get(`/learn/${courseSlug}/`);
                setCourse(response.data);
                setIsEnrolled(response.data.is_enrolled); // Set isEnrolled state based on response
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseSlug]);

    const handleEnroll = async () => {
        setEnrolling(true);
        try {
            const response = await api.post(`/enroll/${courseSlug}/`);
            setIsEnrolled(true);
            navigateTo(`/learn/${courseSlug}/home/welcome`)
        } catch (error) {
            setError(error);
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <Container sx={{ mb: 4 }}>
                    <Typography variant="h4" align="center" sx={{ mt: 4 }}>
                        Loading course...
                    </Typography>
                </Container>
                <Footer />
            </>
        );
    }

    if (!isAuthenticated) {
        return (
            <>
                <Header />
                <Container sx={{ mb: 4 }}>
                    <Typography variant="h4" align="center" sx={{ mt: 4 }}>
                        You must login to enroll to a course.
                    </Typography>
                </Container>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <Container sx={{ mb: 4 }}>
                    <Typography variant="h4" align="center" sx={{ mt: 4 }}>
                        Error: {error.message}
                    </Typography>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <Grid container justifyContent="center" style={{ padding: '20px' }}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h3" gutterBottom>
                            {course.title}
                        </Typography>
                        <Divider style={{ marginBottom: '20px' }} />
                        <Typography variant="body1" gutterBottom>
                            Description: {course.description}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Category: {course.category}
                        </Typography>
                        <Box display="flex" justifyContent="flex-end" style={{ marginTop: '20px' }}>
                            {isEnrolled ? (
                                <Button variant="contained" color="secondary" disabled>
                                    Already Enrolled
                                </Button>
                            ) : (
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={handleEnroll}
                                    disabled={enrolling}
                                >
                                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                </Button>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
};

export default CourseDetailPage;
