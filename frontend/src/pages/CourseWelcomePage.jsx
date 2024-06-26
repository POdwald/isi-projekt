import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/apiService';
import { Typography, Container, Box, Button, Grid, Paper, List, ListItem, ListItemText, LinearProgress, Divider } from '@mui/material';
import { VideoLibrary, Assignment, Book } from '@mui/icons-material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useEnrollment from '../hooks/useEnrollment';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfimationModal';

const CourseWelcomePage = () => {
    const { courseSlug } = useParams();
    const navigateTo = useNavigate();
    const [course, setCourse] = useState(null);
    const [modules, setModules] = useState([]);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const { isEnrolled, loading: enrollmentLoading } = useEnrollment();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await api.get(`/learn/${courseSlug}/`);
                setCourse(response.data);
                setModules(response.data.modules);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };

        const fetchProgress = async () => {
            try {
                const response = await api.get(`/user_progress/${courseSlug}/`);
                setProgress(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchCourse();
        if (isEnrolled) {
            fetchProgress();
        }
    }, [courseSlug, isEnrolled]);

    const handleStartLearning = () => {
        if (modules.length > 0 && modules[0].lessons.length > 0) {
            const firstLesson = modules[0].lessons[0];
            navigateTo(`/learn/${courseSlug}/module/${modules[0].slug}/lesson/${firstLesson.slug}`);
        }
    };

    const handleUnenroll = async () => {
        if (!isEnrolled) {
            return;
        }
        setShowConfirmationModal(true);
    };

    const handleConfirmUnenroll = async () => {
        setShowConfirmationModal(false);
        try {
            const response = await api.post(`/unenroll/${courseSlug}/`);
            navigateTo('/courses');
        } catch (error) {
            setError(error);
        }
    };

    if (loading || enrollmentLoading) {
        return (
            <>
                <Header />
                <LoadingSpinner />
                <Footer />
            </>
        );
    }

    if (error || !isEnrolled) {
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

    const renderProgress = (module) => {
        const moduleProgress = progress.filter(p => p.module === module.id);
        const completedLessons = moduleProgress.filter(p => p.completed && p.lesson).length;
        const totalLessons = module.lessons.length;
        const completedExams = moduleProgress.filter(p => p.completed && p.exam).length;
        const totalExams = module.exams.length;

        return (
            <Box key={module.id} sx={{ mt: 4 }}>
                <Typography variant="h5">{module.title}</Typography>
                <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>{module.description}</Typography>
                {totalLessons > 0 && (
                    <>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Lessons: {completedLessons} / {totalLessons}
                        </Typography>
                        <LinearProgress variant="determinate" value={(completedLessons / totalLessons) * 100} sx={{ mb: 2 }} />
                    </>
                )}
                {totalExams > 0 && (
                    <>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Exams: {completedExams} / {totalExams}
                        </Typography>
                        <LinearProgress variant="determinate" value={(completedExams / totalExams) * 100} sx={{ mb: 4 }} />
                    </>
                )}
                <Divider />
            </Box>
        );
    };

    return (
        <>
            <Header />
            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {course.title}
                </Typography>
                <Typography sx={{ mb: 4}} variant="body1" gutterBottom>
                    {course.description}
                </Typography>
                {modules.map((module) => (
                    <Paper key={module.id} elevation={3} sx={{ p: 3, mb: 4 }}>
                        {renderProgress(module)}
                        <List>
                            {module.lessons.map((lesson) => (
                                <ListItem key={lesson.id} component={Link} to={`/learn/${courseSlug}/module/${module.slug}/lesson/${lesson.slug}`}>
                                    {lesson.content_type === 'video' ? <VideoLibrary /> : <Book />}
                                    <ListItemText sx={{ ml: 2 }} primary={`Lesson: ${lesson.title}`} secondary={`Type: ${lesson.content_type}`} />
                                    {progress.some(p => p.lesson === lesson.id && p.completed) && <CheckCircleOutlineIcon sx={{ ml: 'auto' }} />} {/* Render icon if lesson is completed */}
                                </ListItem>
                            ))}
                            {module.exams.map((exam) => (
                                <ListItem key={exam.id} component={Link} to={`/learn/${courseSlug}/module/${module.slug}/exam/${exam.slug}`}>
                                    <Assignment />
                                    <ListItemText sx={{ ml: 2 }} primary={`Exam: ${exam.title}`} />
                                    {progress.some(p => p.exam === exam.id && p.completed) && <CheckCircleOutlineIcon sx={{ ml: 'auto' }} />} {/* Render icon if exam is completed */}
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                ))}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button fullWidth variant="contained" color="primary" onClick={handleStartLearning}>
                            Start Learning
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button fullWidth variant="outlined" component={Link} to="/courses">
                            Back to Courses
                        </Button>
                    </Grid>
                </Grid>
                <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={handleUnenroll}
                    sx={{ mt: 2 }}
                >
                    Unenroll from Course
                </Button>
                <ConfirmationModal
                    open={showConfirmationModal}
                    onClose={() => setShowConfirmationModal(false)}
                    onConfirm={handleConfirmUnenroll}
                />
            </Container>
            <Footer />
        </>
    );
};

export default CourseWelcomePage;
