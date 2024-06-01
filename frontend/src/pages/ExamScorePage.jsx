import { Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const ExamScorePage = () => {
    const { courseSlug, moduleId, examSlug } = useParams();

    return (
        <Container>
            <Typography variant="h4">Score for {examSlug}</Typography>
            <Typography variant="body1">Your score for {examSlug} in module {moduleId} of {courseSlug}...</Typography>
        </Container>
    );
};

export default ExamScorePage;
