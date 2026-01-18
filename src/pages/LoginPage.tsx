import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import { Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Si déjà connecté, rediriger vers la page d'accueil
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box>
      <LoginForm />
    </Box>
  );
}

export default LoginPage;