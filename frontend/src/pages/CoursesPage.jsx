import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Box, Typography, Grid, Divider } from '@mui/material';
import CourseCard from '../components/CourseCard';
import { api } from '../utils/apiService';
import { useAuth } from '../contexts/AuthContext';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (isAuthenticated) {
                    const enrolledResponse = await api.get('/enrolled_courses/');
                    setEnrolledCourses(enrolledResponse.data);
                }
                const coursesResponse = await api.get('/courses/');
                setCourses(coursesResponse.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
    
        fetchData();
    }, [isAuthenticated]);

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
            <Container sx={{ mt: 4, mb: 4 }}>
                {isAuthenticated && (
                    <>
                        <Typography variant="h4" gutterBottom>
                            Enrolled Courses
                        </Typography>
                        <Grid container spacing={4} sx={{ mb: 4 }}>
                            {enrolledCourses.map((course) => (
                                <Grid item key={course.id} xs={12} sm={6} md={4}>
                                    <CourseCard courseData={course} isEnrolled={true}  />
                                </Grid>
                            ))}
                        </Grid>
                        <Divider />
                    </>
                )}
                <Typography variant="h4" sx={{ mt: 4 }} gutterBottom>
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
