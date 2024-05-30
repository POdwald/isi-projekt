import { TextField, Box } from '@mui/material';

const CreateQuestionForm = ({ courseData, setCourseData, moduleIndex, examIndex, questionIndex }) => {
    const handleQuestionChange = (e, field) => {
        let value;
        if (field === 'choices'){
            value = e.target.value.split(', ');
        }
        else {
            value = e.target.value;
        }
        
        const updatedModules = [...courseData.modules];
        updatedModules[moduleIndex].exams[examIndex].questions[questionIndex][field] = value;
        setCourseData({ ...courseData, modules: updatedModules });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
                label="Question Text"
                value={courseData.modules[moduleIndex].exams[examIndex].questions[questionIndex].question_text}
                onChange={(e) => handleQuestionChange(e, 'question_text')}
                fullWidth
            />
            <TextField
                label="Choices (comma separated)"
                value={courseData.modules[moduleIndex].exams[examIndex].questions[questionIndex].choices.join(', ')}
                onChange={(e) => handleQuestionChange(e, 'choices')}
                fullWidth
            />
            <TextField
                label="Correct Answer (index)"
                type="number"
                value={parseInt(courseData.modules[moduleIndex].exams[examIndex].questions[questionIndex].correct_answer)}
                onChange={(e) => handleQuestionChange(e, 'correct_answer')}
                fullWidth
            />
        </Box>
    );
};

export default CreateQuestionForm;
