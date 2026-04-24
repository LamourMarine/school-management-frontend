import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, LoginRequest, RegisterRequest } from '../types';
import authService from '../services/authService';
import { useNotification } from './NotificationContext';
import { error } from 'node:console';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);

  // Charger le token et l'utilisateur au démarrage
  useEffect(() => {
    const savedToken = authService.getAccessToken();
    const savedUser = authService.getUser();

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
      } catch (error) {
        // Si le JSON est invalide, nettoyer le localStorage
        console.error('Invalid user data in localStorage:', error);
        authService.logout();
      }
    }
    setIsLoading(false);
  }, []);
  //Login
  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authService.login(credentials);
      console.log('🔍 Response complète:', response.data);
      const { accessToken, username, role } = response.data;
      console.log('🔍 Access token:', accessToken);

      // Créer l'objet user manuellement
      const user: User = { username, email: '', role };

      // Sauvegarder dans le state
      setToken(accessToken);
      setUser(user);

      // Sauvegarder dans localStorage
      authService.saveAuthData(accessToken, user);

      showNotification('Login successful!', 'success');
    } catch (error: any) {
      console.error('Login error:', error);
      showNotification(
        error.response?.data?.message || 'Login failed. Please check your credentials.',
        'error'
      );
      throw error;
    }
  };
  //Register
  const register = async (userData: RegisterRequest) => {
    try {
      const response = await authService.register(userData);
      const { accessToken, username, role } = response.data;

      // Créer l'objet user manuellement
      const user: User = { username, email: userData.email, role };

      // Sauvegarder dans le state
      setToken(accessToken);
      setUser(user);

      // Sauvegarder dans localStorage
      authService.saveAuthData(accessToken, user);

      showNotification('Registration successful!', 'success');
    } catch (error: any) {
      console.error('Registration error:', error);
      showNotification(
        error.response?.data?.message || 'Registration failed. Please try again.',
        'error'
      );
      throw error;
    }
  };    
  // Ecoute l'événement auth:logout déclenché par api.ts quand le refresh échoue
  useEffect(() => {
    const handleLogout = () => {
        setUser(null);
        setToken(null);
        authService.clearAuthData();
    };
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
}, []);
  //Logout
  const logout = async () => {
    setUser(null);
    setToken(null);
    authService.clearAuthData();
    await authService.logout();
    showNotification('Logged out successfully', 'info');
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//Hook personnalisépour utiliser le contexte
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an authProvider');
  }
  return context;
}