import { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box, Divider, Button } from '@mui/material';
import { Book, VideoLibrary, Assignment, ArrowBack } from '@mui/icons-material'; // Import the necessary icons
import { Link, useParams } from 'react-router-dom'; // Import the Link component and useParams hook
import { api } from '../utils/apiService'; // Import the API service
import useEnrollment from '../hooks/useEnrollment';

const CourseNavigationSidebar = () => {
    const [modules, setModules] = useState([]); // State to hold the modules
    const { isEnrolled, loading: enrollmentLoading } = useEnrollment();
    const { courseSlug, lessonSlug, examSlug } = useParams(); // Get the lessonSlug and examSlug from the URL params

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await api.get(`/learn/${courseSlug}/`);
                setModules(response.data.modules);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        if (isEnrolled) {
            fetchCourse();
        }
    }, [courseSlug, isEnrolled]);

    if(!isEnrolled) {
        return null;
    }

    return (
        <Box sx={{ width: '300px', borderRight: '1px solid gray', padding: '5px'}}>
            <List>
                <Link to={`/learn/${courseSlug}/home/welcome`}>
                    <Button startIcon={<ArrowBack />} variant="outlined" sx={{ marginBottom: '10px' }}>Back to Course</Button>
                </Link>
                {modules.map((module, index) => (
                    <Box key={index}>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary={module.title}
                                primaryTypographyProps={{
                                    variant: 'h6',
                                    fontWeight: 'bold',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            />
                        </ListItem>
                        <Divider />
                        {module.lessons.map((lesson, lessonIndex) => (
                            <Link key={`lesson-${index}-${lessonIndex}`} to={`/learn/${courseSlug}/module/${module.slug}/lesson/${lesson.slug}`}>
                                <ListItem button selected={lessonSlug === lesson.slug}>
                                    <ListItemIcon>
                                        {lesson.content_type === 'video' ? <VideoLibrary /> : <Book />}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={lesson.title}
                                        primaryTypographyProps={{
                                            variant: 'body1',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    />
                                </ListItem>
                            </Link>
                        ))}
                        {module.exams.map((exam, examIndex) => (
                            <Link key={`exam-${index}-${examIndex}`} to={`/learn/${courseSlug}/module/${module.slug}/exam/${exam.slug}`}>
                                <ListItem button selected={examSlug === exam.slug}>
                                    <ListItemIcon>
                                        <Assignment />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={exam.title}
                                        primaryTypographyProps={{
                                            variant: 'body1',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    />
                                </ListItem>
                            </Link>
                        ))}
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default CourseNavigationSidebar;
