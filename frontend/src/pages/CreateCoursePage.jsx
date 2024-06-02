import { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../utils/apiService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseCreationSidebar from '../components/CourseCreationSidebar';
import CreateCourseForm from '../components/CreateCourseForm';
import CreateModuleForm from '../components/CreateModuleForm';
import CreateLessonForm from '../components/CreateLessonForm';
import CreateExamForm from '../components/CreateExamForm';


const CreateCoursePage = () => {
    const { isAuthenticated } = useAuth();

    const [courseData, setCourseData] = useState(() => {
        const storedData = localStorage.getItem('courseData');
        return storedData ? JSON.parse(storedData) : { title: '', description: '', category: '', modules: [] };
    });
    const [moduleData, setModuleData] = useState({ title: '', description: '', lessons: [], exams: [] });
    const [lessonData, setLessonData] = useState({ title: '', content_type: 'text', content: '' });
    const [examData, setExamData] = useState({ title: '', questions: [] });
    const [questionData, setQuestionData] = useState({ question_text: '', choices: [], correct_answer: 0 });

    const [menuItems, setMenuItems] = useState(() => {
        const storedMenuItems = localStorage.getItem('menuItems');
        return storedMenuItems ? JSON.parse(storedMenuItems) : [{ id: 0, label: 'Overview', type: 'overview' }];
    });
    const [activeItem, setActiveItem] = useState(menuItems[0]);

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('courseData', JSON.stringify(courseData));
    }, [courseData]);

    // Save menu items to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }, [menuItems]);

    const updateMenuItems = (courseData) => {
        let idCounter = 1
        let newMenuItems = [{ id: 0, label: 'Overview', type: 'overview' }];
        courseData.modules.forEach((module, moduleIndex) => {
            newMenuItems.push({ id: idCounter++, label: module.title, type: 'module', index: moduleIndex });
            module.lessons.forEach((lesson, lessonIndex) => {
                newMenuItems.push({ id: idCounter++, label: lesson.title, type: 'lesson', moduleIndex, lessonIndex });
            });
            module.exams.forEach((exam, examIndex) => {
                newMenuItems.push({ id: idCounter++, label: exam.title, type: 'exam', moduleIndex, examIndex });
            });
        });
        return newMenuItems;
    };

    const handleAddModule = () => {
        const newModule = { ...moduleData, title: `Module ${courseData.modules.length + 1}` };
        const updatedModules = [...courseData.modules, newModule];
        setCourseData({ ...courseData, modules: updatedModules });
        setMenuItems(updateMenuItems({ ...courseData, modules: updatedModules }));
        setModuleData({ title: '', description: '', lessons: [], exams: [] });
    };
    
    const handleAddLesson = (moduleIndex) => {
        const newLesson = { ...lessonData, title: `Lesson ${courseData.modules[moduleIndex].lessons.length + 1}` };
        const updatedModules = [...courseData.modules];
        updatedModules[moduleIndex].lessons.push(newLesson);
        setCourseData({ ...courseData, modules: updatedModules });
        setMenuItems(updateMenuItems({ ...courseData, modules: updatedModules }));
        setLessonData({ title: '', content_type: 'text', content: '' });
    };
    
    const handleAddExam = (moduleIndex) => {
        const newExam = { ...examData, title: `Exam ${courseData.modules[moduleIndex].exams.length + 1}` };
        const updatedModules = [...courseData.modules];
        updatedModules[moduleIndex].exams.push(newExam);
        setCourseData({ ...courseData, modules: updatedModules });
        setMenuItems(updateMenuItems({ ...courseData, modules: updatedModules }));
        setExamData({ title: '', questions: [] });
    };
    
    const handleAddQuestion = (moduleIndex, examIndex) => {
        console.log(courseData.modules);
        const newQuestion = {
            ...questionData,
            question_text: `Question ${courseData.modules[moduleIndex].exams[examIndex].questions.length + 1}`
        };
    
        const updatedModules = [...courseData.modules];
        const updatedExam = { ...updatedModules[moduleIndex].exams[examIndex] };
        updatedExam.questions.push(newQuestion);
        updatedModules[moduleIndex].exams[examIndex] = updatedExam;
    
        setCourseData({ ...courseData, modules: updatedModules });
        setQuestionData({ question_text: '', choices: [], correct_answer: 0 });
    };
    
    const handleSubmit = async () => {
        try {
            console.log(courseData);
            const response = await api.post('/create_course/', courseData);
            setCourseData({ title: '', description: '', category: '', modules: [] });
            setMenuItems([{ label: 'Overview', type: 'overview' }]);
            localStorage.removeItem('courseData');
            localStorage.removeItem('menuItems');
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    const handleClearAllData = () => {
        setCourseData({ title: '', description: '', category: '', modules: [] });
        setMenuItems([{ label: 'Overview', type: 'overview' }]);
        localStorage.removeItem('courseData');
        localStorage.removeItem('menuItems');
    };

    const handleMenuClick = (item) => {
        setActiveItem(item);
        const updatedModules = [...courseData.modules];
        setMenuItems(updateMenuItems({ ...courseData, modules: updatedModules }));
    };

    const handleDeleteItem = (item) => {
        if (item.label === 'Overview') { return }

        const updatedModules = [...courseData.modules];
        if (item.type === 'module') {
            updatedModules.splice(item.moduleIndex, 1);
        } else if (item.type === 'lesson') {
            updatedModules[item.moduleIndex].lessons.splice(item.lessonIndex, 1);
        } else if (item.type === 'exam') {
            updatedModules[item.moduleIndex].exams.splice(item.examIndex, 1);
        }

        setCourseData({ ...courseData, modules: updatedModules });
        setMenuItems(updateMenuItems({ ...courseData, modules: updatedModules }));
        setActiveItem(menuItems[0]); // Reset activeItem to the first item after deletion
    };

    return (
        <>
            <Header />
            <Container sx={{ marginTop: '24px', marginBottom: '48px' }}>
                {isAuthenticated ? (
                    <>
                        <Typography variant="h4">Create Course</Typography>
                        <Grid container spacing={2}>
                            <Grid item>
                                <CourseCreationSidebar
                                    activeItem={activeItem}
                                    menuItems={menuItems}
                                    handleAddModule={handleAddModule}
                                    handleMenuClick={handleMenuClick}
                                    handleDeleteItem={handleDeleteItem}
                                />
                            </Grid>
                            <Grid item xs>
                                {activeItem.type === 'overview' && (
                                    <CreateCourseForm
                                        courseData={courseData}
                                        setCourseData={setCourseData}
                                        handleSubmit={handleSubmit}
                                        handleClearAllData={handleClearAllData}
                                    />
                                )}
                                {activeItem.type === 'module' && (
                                    <CreateModuleForm
                                        courseData={courseData}
                                        setCourseData={setCourseData}
                                        activeItem={activeItem}
                                        handleAddLesson={handleAddLesson}
                                        handleAddExam={handleAddExam}
                                    />
                                )}
                                {activeItem.type === 'lesson' && (
                                    <CreateLessonForm
                                        courseData={courseData}
                                        setCourseData={setCourseData}
                                        activeItem={activeItem}
                                    />
                                )}
                                {activeItem.type === 'exam' && (
                                    <CreateExamForm
                                        courseData={courseData}
                                        setCourseData={setCourseData}
                                        activeItem={activeItem}
                                        handleAddQuestion={handleAddQuestion}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <Typography variant="body1" gutterBottom>
                        Please log in to create a new course.
                    </Typography>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default CreateCoursePage;
