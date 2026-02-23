import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
      return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
  }
  // Sinon, afficher le contenu demandé
  return <>{children}</>;
}

export default ProtectedRoute;