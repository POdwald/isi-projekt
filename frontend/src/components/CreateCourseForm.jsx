import { TextField, Button, Box } from '@mui/material';

const CreateCourseForm = ({ courseData, setCourseData, handleClearAllData, handleSubmit }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
                label="Course Title"
                value={courseData.title}
                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                fullWidth
            />
            <TextField
                label="Description"
                value={courseData.description}
                onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                fullWidth
            />
            <TextField
                label="Category"
                value={courseData.category}
                onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleClearAllData} fullWidth>
                Clear course data
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                Create Course
            </Button>
        </Box>
    );
};

export default CreateCourseForm;
