import { Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const LessonPage = () => {
    const { courseSlug, moduleId, lessonSlug } = useParams();

    return (
        <Container>
            <Typography variant="h4">{lessonSlug}</Typography>
            <Typography variant="body1">Content for {lessonSlug} in module {moduleId} of {courseSlug}...</Typography>
        </Container>
    );
};

export default LessonPage;
