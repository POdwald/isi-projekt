import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Box, Typography, Grid } from '@mui/material';
import CourseCard from '../components/CourseCard';
import { api } from '../utils/apiService';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses/');
                setCourses(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <>
                <Header />
                <Container>
                    <Typography variant="h4" align="center" sx={{ mt: 4 }}>
                        Loading courses...
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
                <Container>
                    <Typography variant="h4" align="center" sx={{ mt: 4 }}>
                        Failed to load courses.
                    </Typography>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Available Courses
                </Typography>
                <Grid container spacing={4}>
                    {courses.map((course) => (
                        <Grid item key={course.id} xs={12} sm={6} md={4}>
                            <CourseCard courseData={course} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default CoursesPage;
