import { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const CreateLessonForm = ({ courseData, setCourseData, activeItem }) => {
    const [isPreview, setIsPreview] = useState(false);

    const moduleIndex = activeItem?.type === 'lesson' ? activeItem.moduleIndex : null;
    const lessonIndex = activeItem?.type === 'lesson' ? activeItem.lessonIndex : null;

    const handleLessonChange = (e, field) => {
        const updatedModules = [...courseData.modules];
        updatedModules[moduleIndex].lessons[lessonIndex][field] = e.target.value;
        setCourseData({ ...courseData, modules: updatedModules });
    };

    const togglePreview = () => {
        setIsPreview(!isPreview);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
                label="Lesson Title"
                value={courseData.modules[moduleIndex].lessons[lessonIndex].title}
                onChange={(e) => handleLessonChange(e, 'title')}
                fullWidth
            />
            <TextField
                label="Content Type"
                value={courseData.modules[moduleIndex].lessons[lessonIndex].content_type}
                onChange={(e) => handleLessonChange(e, 'content_type')}
                fullWidth
            />
            {isPreview ? (
                <Box sx={{ 
                    padding: '20px', 
                    border: '1px solid #c4c4c4', 
                    borderRadius: '8px', 
                    backgroundColor: '#f9f9f9' 
                  }}>
                    <ReactMarkdown 
                      children={courseData.modules[moduleIndex].lessons[lessonIndex].content} 
                      components={{
                        h1: ({node, ...props}) => <h1 style={{color: '#333', fontSize: '2em', marginBottom: '0.5em'}} {...props} />,
                        h2: ({node, ...props}) => <h2 style={{color: '#444', fontSize: '1.75em', marginBottom: '0.5em'}} {...props} />,
                        h3: ({node, ...props}) => <h3 style={{color: '#555', fontSize: '1.5em', marginBottom: '0.5em'}} {...props} />,
                        p: ({node, ...props}) => <p style={{color: '#666', fontSize: '1em', lineHeight: '1.6', marginBottom: '1em'}} {...props} />,
                        ul: ({node, ...props}) => <ul style={{color: '#666', fontSize: '1em', lineHeight: '1.6', marginBottom: '1em', paddingLeft: '20px'}} {...props} />,
                        ol: ({node, ...props}) => <ol style={{color: '#666', fontSize: '1em', lineHeight: '1.6', marginBottom: '1em', paddingLeft: '20px'}} {...props} />,
                        code: ({node, ...props}) => <code style={{backgroundColor: '#eee', padding: '2px 4px', borderRadius: '4px', fontSize: '0.9em'}} {...props} />,
                        blockquote: ({node, ...props}) => <blockquote style={{borderLeft: '4px solid #ccc', paddingLeft: '10px', color: '#666', fontStyle: 'italic', marginBottom: '1em'}} {...props} />,
                      }}
                    />
                  </Box>
            ) : (
                <TextField
                    label="Content"
                    value={courseData.modules[moduleIndex].lessons[lessonIndex].content}
                    onChange={(e) => handleLessonChange(e, 'content')}
                    fullWidth
                    multiline
                    minRows={10}
                />
            )}
            <Button variant="contained" onClick={togglePreview}>
                {isPreview ? 'Edit Content' : 'Preview Content'}
            </Button>
        </Box>
    );
};

export default CreateLessonForm;
