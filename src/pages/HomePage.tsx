import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { School, Book, Grade } from '@mui/icons-material';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        School Management System
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Manage students, courses, and grades
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        gap: 3, 
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <Card>
            <CardContent>
              <School sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Students
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Manage student information and view their reports
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => navigate('/students')}
              >
                Go to Students
              </Button>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <Card>
            <CardContent>
              <Book sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Courses
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Manage courses and their information
              </Typography>
              <Button 
                variant="contained" 
                color="success"
                fullWidth
                onClick={() => navigate('/courses')}
              >
                Go to Courses
              </Button>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <Card>
            <CardContent>
              <Grade sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Grades
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Manage student grades and assessments
              </Typography>
              <Button 
                variant="contained" 
                color="warning"
                fullWidth
                onClick={() => navigate('/grades')}
              >
                Go to Grades
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;