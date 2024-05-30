import { TextField, Box, Button } from '@mui/material';

const CreateModuleForm = ({ courseData, setCourseData, activeItem, handleAddLesson, handleAddExam }) => {
    const moduleIndex = activeItem.type === 'module' ? activeItem.index : null;

    const handleAddLessonClick = () => {
        handleAddLesson(moduleIndex);
    };

    const handleAddExamClick = () => {
        handleAddExam(moduleIndex);
    };

    const handleModuleChange = (e, field) => {
        const updatedModules = [...courseData.modules];
        updatedModules[moduleIndex][field] = e.target.value;
        setCourseData({ ...courseData, modules: updatedModules });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
                label="Module Title"
                value={courseData.modules[moduleIndex].title}
                onChange={(e) => handleModuleChange(e, 'title')}
                fullWidth
            />
            <TextField
                label="Description"
                value={courseData.modules[moduleIndex].description}
                onChange={(e) => handleModuleChange(e, 'description')}
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleAddLessonClick} fullWidth>
                Add new lesson
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddExamClick} fullWidth>
                Add new exam
            </Button>
        </Box>
    );
};

export default CreateModuleForm;
