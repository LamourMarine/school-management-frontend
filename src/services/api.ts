import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur de requête - Ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse - Gérer les erreurs 401 (non autorisé)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token invalide ou expiré - déconnecter l'utilisateur
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Rediriger vers login (sera géré par le composant)
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;