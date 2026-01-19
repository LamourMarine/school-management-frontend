import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { School, Logout, Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: 'Students', path: '/students' },
    { label: 'Courses', path: '/courses' },
    { label: 'Grades', path: '/grades' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  // Menu mobile (drawer)
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <School sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ mt: 1 }}>
          School Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {user?.username}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton 
              onClick={() => handleNavigate(item.path)}
              selected={isActive(item.path)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <Logout sx={{ mr: 2 }} />
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Menu burger (visible sur mobile uniquement) */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <School sx={{ mr: 2 }} />
          <Typography 
            variant="h6" 
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            School Management
          </Typography>

          {/* Menu desktop (caché sur mobile) */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
            {menuItems.map((item) => (
              <Button 
                key={item.path}
                color="inherit"
                onClick={() => navigate(item.path)}
                sx={{ 
                  fontWeight: isActive(item.path) ? 'bold' : 'normal',
                  textDecoration: isActive(item.path) ? 'underline' : 'none'
                }}
              >
                {item.label}
              </Button>
            ))}

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

      {/* Drawer mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;