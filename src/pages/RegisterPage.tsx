import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';
import { Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
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
      <RegisterForm />
    </Box>
  );
}

export default RegisterPage;