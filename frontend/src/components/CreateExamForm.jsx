import React from 'react';
import { TextField, Button, Box, Divider } from '@mui/material';
import CreateQuestionForm from './CreateQuestionForm';

const CreateExamForm = ({ courseData, setCourseData, activeItem, handleAddQuestion } ) => {
    const moduleIndex = activeItem?.type === 'exam' ? activeItem.moduleIndex : null;
    const examIndex = activeItem?.type === 'exam' ? activeItem.examIndex : null;

    const handleAddQuestionClick = () => {
        handleAddQuestion(moduleIndex, examIndex);
    };

    const handleExamChange = (e, field) => {
        const updatedModules = [...courseData.modules];
        updatedModules[moduleIndex].exams[examIndex][field] = e.target.value;
        setCourseData({ ...courseData, modules: updatedModules });
    };

    const questions = courseData.modules[moduleIndex]?.exams[examIndex]?.questions || [];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
                label="Exam Title"
                value={courseData.modules[moduleIndex].exams[examIndex].title}
                onChange={(e) => handleExamChange(e, 'title')}
                fullWidth
            />
            <Button
                variant="contained"
                onClick={handleAddQuestionClick}
                fullWidth
                sx={{ mt: 2 }}
            >
                + Add Question
            </Button>
            {questions.map((question, questionIndex) => (
                <React.Fragment key={questionIndex}>
                    <CreateQuestionForm
                        courseData={courseData}
                        setCourseData={setCourseData}
                        moduleIndex={moduleIndex}
                        examIndex={examIndex}
                        questionIndex={questionIndex}
                    />
                    <Divider />
                </React.Fragment> 
            ))}
        </Box>
    );
};

export default CreateExamForm;
