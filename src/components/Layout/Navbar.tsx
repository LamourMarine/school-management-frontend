import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { School, Logout } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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

          {/* Nom d'utilisateur */}
          <Typography 
            variant="body1" 
            sx={{ 
              ml: 2, 
              px: 2, 
              py: 0.5,
              borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            {user?.username}
          </Typography>

          {/* Bouton Logout */}
          <Button 
            color="inherit"
            onClick={handleLogout}
            startIcon={<Logout />}
            sx={{ ml: 1 }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;