import { useEffect, useState } from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { api } from '../utils/apiService';
import useEnrollment from '../hooks/useEnrollment';
import CourseNavigationSidebar from '../components/CourseNavigationSidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import Footer from '../components/Footer';


const ExamPage = () => {
    const { courseSlug, moduleSlug, examSlug } = useParams();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isEnrolled, loading: enrollmentLoading } = useEnrollment();

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await api.get(`/learn/${courseSlug}/module/${moduleSlug}/exam/${examSlug}/`);
                setExam(response.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };

        if (isEnrolled) {
            fetchExam();
        }
    }, [courseSlug, moduleSlug, examSlug, isEnrolled]);

    if (loading || enrollmentLoading) {
        return (
            <>
                <Header />
                <LoadingSpinner />
                <Footer />
            </>
        );
    }

    if (!isEnrolled || error) {
        return (
            <>
                <Header />
                <Container sx={{ mb: 4 }}>
                    <Typography variant="h4" align="center" sx={{ mt: 4 }}>
                        {error ? `Error: ${error.message}` : "You are not enrolled in this course."}
                    </Typography>
                    <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                        <Button component={Link} to="/courses" variant="contained">
                            Back to Courses
                        </Button>
                    </Box>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', mt: 4, mb: 4 }}>
                <CourseNavigationSidebar />
                <Box sx={{ ml: 4 }}>
                    <Typography sx={{ mb: 4 }} variant="h4">{exam.title}</Typography>
                    <Typography variant="body1">{exam.description}</Typography>
                    <Button component={Link} to={`/learn/${courseSlug}/module/${moduleSlug}/exam/${examSlug}/attempt`} variant="contained" color="primary" sx={{ mt: 4 }}>
                        Start Exam
                    </Button>
                </Box>
            </Container>
            <Footer />
        </div>
    );
};

export default ExamPage;
