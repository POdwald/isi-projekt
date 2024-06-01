import { Typography, Container, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const ExamPage = () => {
    const { courseSlug, moduleId, examSlug } = useParams();

    return (
        <Container>
            <Typography variant="h4">{examSlug}</Typography>
            <Typography variant="body1">Details for exam {examSlug} in module {moduleId} of {courseSlug}...</Typography>
            <Button component={Link} to={`/learn/${courseSlug}/home/module/${moduleId}/exam/${examSlug}/attempt`}>Start Exam</Button>
        </Container>
    );
};

export default ExamPage;
