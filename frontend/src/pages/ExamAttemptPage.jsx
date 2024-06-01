import { Typography, Container, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const ExamAttemptPage = () => {
    const { courseSlug, moduleId, examSlug } = useParams();

    return (
        <Container>
            <Typography variant="h4">Attempt {examSlug}</Typography>
            <Typography variant="body1">Questions for {examSlug}...</Typography>
            <Button component={Link} to={`/learn/${courseSlug}/home/module/${moduleId}/exam/${examSlug}/score`}>Submit Exam</Button>
        </Container>
    );
};

export default ExamAttemptPage;
