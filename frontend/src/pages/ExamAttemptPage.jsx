import { useState, useEffect } from 'react';
import { Typography, Container, Button, Box, Paper, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/apiService';
import useEnrollment from '../hooks/useEnrollment';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

const ExamAttemptPage = () => {
    const { courseSlug, moduleSlug, examSlug } = useParams();
    const navigateTo = useNavigate();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
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

    const handleAnswerChange = (questionId, answerId) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answerId,
        }));
    };

    const handleSubmit = async () => {
        try {
            // Submit the answers to the exam
            const submitResponse = await api.post(`/learn/${courseSlug}/module/${moduleSlug}/exam/${examSlug}/attempt/`, { answers });
            if (submitResponse.status !== 200) {
                console.error('Error submitting exam:', submitResponse.statusText);
                setError(submitResponse.statusText);
                return;
            }
    
            // If the submission is successful, complete the exam
            const completeResponse = await api.post(`/complete_exam/${courseSlug}/${moduleSlug}/${examSlug}/`);
            if (completeResponse.status === 200) {
                navigateTo(`/learn/${courseSlug}/module/${moduleSlug}/exam/${examSlug}/score`);
            } else {
                console.error('Error completing exam:', completeResponse.statusText);
                setError(completeResponse.statusText);
            }
        } catch (error) {
            console.error('Error submitting or completing exam:', error);
            setError(error.message);
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
                <Box sx={{ ml: 4 }}>
                    <Typography sx={{ mb: 4 }} variant="h4">Attempt {exam.title}</Typography>
                    <Box>
                        {exam.questions.map(question => (
                            <Paper elevation={3} sx={{ p: 3, mb: 4 }} key={question.id}>
                                <Typography variant="h6">{question.question_text}</Typography>
                                <RadioGroup
                                    name={`question-${question.id}`}
                                    value={answers[question.id] || ''}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                >
                                    {question.choices.map((option, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={index}
                                            control={<Radio />}
                                            label={option}
                                        />
                                    ))}
                                </RadioGroup>
                            </Paper>
                        ))}
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit Exam
                    </Button>
                </Box>
            </Container>
            <Footer />
        </div>
    );
};

export default ExamAttemptPage;
