import { useState, useEffect } from 'react';
import { Typography, Container, Box, Button, Link, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { api } from '../utils/apiService';
import useEnrollment from '../hooks/useEnrollment';
import ReactMarkdown from 'react-markdown';
import YouTube from 'react-youtube';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import CourseNavigationSidebar from '../components/CourseNavigationSidebar';

const LessonPage = () => {
    const { courseSlug, moduleSlug, lessonSlug } = useParams();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isEnrolled, loading: enrollmentLoading } = useEnrollment();

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await api.get(`/learn/${courseSlug}/module/${moduleSlug}/lesson/${lessonSlug}/`);
                setLesson(response.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };

        if (isEnrolled) {
            fetchLesson();
        }
        
    }, [courseSlug, moduleSlug, lessonSlug, isEnrolled]);

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

    const getYouTubeEmbedUrl = (url) => {
        const videoIdMatch = url.match(/[?&]v=([^&#]*)/);
        return videoIdMatch ? videoIdMatch[1] : null;
    };

    const youtubeVideoId = lesson.content_type === 'video' ? getYouTubeEmbedUrl(lesson.content) : null;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', mt: 4, mb: 4 }}>
                <CourseNavigationSidebar />
                <Box sx={{ ml: 4 }}>
                    <Typography sx={{ mb: 4 }} variant="h4">{lesson.title}</Typography>
                    {console.log(lesson.content_type)}
                    {lesson.content_type === 'markdown' && (
                        <Paper elevation={3} sx={{ p: 3, maxWidth: '800px', width: '100%', mb: 4 }}>
                            <ReactMarkdown>{lesson.content}</ReactMarkdown>
                        </Paper>
                    )}
                    {lesson.content_type === 'text' && (
                        <Paper elevation={3} sx={{ p: 3, maxWidth: '800px', width: '100%', mb: 4 }}>
                            <Typography variant="body1">{lesson.content}</Typography>
                        </Paper>
                    )}
                    {lesson.content_type === 'video' && (
                        <YouTube videoId={youtubeVideoId} />
                    )}
                    <Button variant="contained" color="primary" sx={{ mt: 4 }}>
                        Complete Lesson
                    </Button>
                </Box>
            </Container>
            <Footer />
        </div>
    );
};

export default LessonPage;
