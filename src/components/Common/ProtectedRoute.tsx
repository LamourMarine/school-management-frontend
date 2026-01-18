import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  // Si l'utilisateur n'est pas connecté, rediriger vers /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Sinon, afficher le contenu demandé
  return <>{children}</>;
}

export default ProtectedRoute;