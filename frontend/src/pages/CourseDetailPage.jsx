import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/apiService';
import { Typography, Grid, Paper, Divider, Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CourseDetailPage = () => {
    const { courseSlug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const response = await api.get(`/learn/${courseSlug}/`);
          setCourse(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchCourse();
    }, [courseSlug]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    if (!course) {
        return (
            <>
                <Header />
                <Grid container justifyContent="center" style={{ padding: '20px' }}>
                    <CircularProgress />
                </Grid>
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
                            Course Detail: {course.title}
                        </Typography>
                        <Divider style={{ marginBottom: '20px' }} />
                        <Typography variant="body1" gutterBottom>
                            Description: {course.description}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Category: {course.category}
                        </Typography>
                        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Enroll Now
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
};

export default CourseDetailPage;
