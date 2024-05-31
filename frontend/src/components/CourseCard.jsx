import { Card, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseCard = ({ courseData }) => {
    return (
        <Card component={Link} to={`/learn/${courseData.slug}`}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={courseData.image || 'https://via.placeholder.com/140'}
                    alt={courseData.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {courseData.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {courseData.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CourseCard;
