import { Card, CardContent, CardMedia, CardActionArea, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseCard = ({ courseData, isEnrolled }) => {
    return (
        <Card component={Link} to={isEnrolled ? `/learn/${courseData.slug}/home/welcome` : `/learn/${courseData.slug}`} sx={{ textDecoration: 'none', position: 'relative', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardActionArea sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={courseData.image || 'https://via.placeholder.com/140'}
                    alt={courseData.title}
                    sx={{ filter: 'brightness(70%)' }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6))', // Gradient overlay
                    }}
                />
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" color="white">
                        {courseData.title}
                    </Typography>
                    <Typography variant="body2" color="white" paragraph>
                        {courseData.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CourseCard;
