import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { School } from '@mui/icons-material';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="static">
      <Toolbar>
        <School sx={{ mr: 2 }} />
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          School Management
        </Typography>

        <Box>
          <Button 
            color="inherit"
            onClick={() => navigate('/students')}
            sx={{ 
              fontWeight: isActive('/students') ? 'bold' : 'normal',
              textDecoration: isActive('/students') ? 'underline' : 'none'
            }}
          >
            Students
          </Button>
          <Button 
            color="inherit"
            onClick={() => navigate('/courses')}
            sx={{ 
              fontWeight: isActive('/courses') ? 'bold' : 'normal',
              textDecoration: isActive('/courses') ? 'underline' : 'none'
            }}
          >
            Courses
          </Button>
          <Button 
            color="inherit"
            onClick={() => navigate('/grades')}
            sx={{ 
              fontWeight: isActive('/grades') ? 'bold' : 'normal',
              textDecoration: isActive('/grades') ? 'underline' : 'none'
            }}
          >
            Grades
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;