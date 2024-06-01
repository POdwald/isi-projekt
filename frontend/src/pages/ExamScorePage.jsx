import { useState, useEffect } from 'react';
import { Typography, Container, Box, Paper, Button} from '@mui/material';
import { api } from '../utils/apiService';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import useEnrollment from '../hooks/useEnrollment';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ExamScorePage = () => {
    const { courseSlug, moduleSlug, examSlug } = useParams();
    const navigateTo = useNavigate();
    const [attempt, setAttempt] = useState(null);
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isEnrolled, loading: enrollmentLoading } = useEnrollment();

    useEffect(() => {
        const fetchExamAndResult = async () => {
            try {
                const [examResponse, attemptResponse] = await Promise.all([
                    api.get(`/learn/${courseSlug}/module/${moduleSlug}/exam/${examSlug}/`),
                    api.get(`/exam_attempts/last_result/`)
                ]);
                setExam(examResponse.data);
                setAttempt(attemptResponse.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        if (isEnrolled) {
            fetchExamAndResult();
        }
    }, [examSlug, isEnrolled]);

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

    const getUserAnswer = (question) => {
        const userChoiceId = attempt.answers[question.id];
        const userChoice = question.choices[userChoiceId];
        return userChoice;
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1">
                        Score for {examSlug}:
                    </Typography>
                    <Typography variant="h4" component="h1" color={attempt.score >= 70 ? 'primary' : 'error'}>
                        {attempt.score}%
                    </Typography>
                </Box>
                {exam && attempt && (
                    <Box>
                        {exam.questions.map((question, index) => (
                            <Paper elevation={3} sx={{ p: 3, mb: 4 }} key={question.id}>
                                <Typography variant="h6" gutterBottom>
                                    {index + 1}. {question.question_text}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Your answer: {getUserAnswer(question)}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Correct answer: {question.choices[question.correct_answer]}
                                </Typography>
                                {getUserAnswer(question) !== question.choices[question.correct_answer] && (
                                    <Typography variant="body1" color="error">
                                        You got this question wrong.
                                    </Typography>
                                )}
                            </Paper>
                        ))}
                    </Box>
                )}
                <Button component={Link} to={`/learn/${courseSlug}/module/${moduleSlug}/exam/${examSlug}/`} variant="contained" color="primary" sx={{ mt: 4 }}>
                    Back to Exam
                </Button>
            </Container>
            <Footer />
        </div>
    );
};

export default ExamScorePage;
