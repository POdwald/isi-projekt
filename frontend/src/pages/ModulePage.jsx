import { Typography, Container, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const ModulePage = () => {
    const { courseSlug, moduleId } = useParams();

    return (
        <Container>
            <Typography variant="h4">Module {moduleId}</Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Lesson 1" />
                    <Button component={Link} to={`/learn/${courseSlug}/home/module/${moduleId}/lesson/lesson-1`}>Go to Lesson</Button>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Exam 1" />
                    <Button component={Link} to={`/learn/${courseSlug}/home/module/${moduleId}/exam/exam-1`}>Take Exam</Button>
                </ListItem>
            </List>
        </Container>
    );
};

export default ModulePage;
