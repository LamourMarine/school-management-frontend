import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Flag pour éviter les boucles infinies
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Intercepteur de requête - Ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('Token dans intercepteur:', accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse - Gérer les erreurs 401 et refresh automatique
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(' Erreur interceptée:', error.response?.status);
    const originalRequest = error.config;

    // Si erreur 401 et pas déjà tenté de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log(' Déclenchement du refresh !');
      if (isRefreshing) {
        // Si un refresh est déjà en cours, mettre en file d'attente
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // Pas de refresh token, déconnecter
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // Appeler /refresh sans passer par l'intercepteur
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
          {},
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );

        const { accessToken } = response.data;

        // Mettre à jour les tokens
        localStorage.setItem('accessToken', accessToken);

        // Mettre à jour le header de la requête originale
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Traiter la file d'attente
        processQueue(null, accessToken);

        // Retry la requête originale
        return api(originalRequest);
      } catch (refreshError) {
        // Le refresh a échoué, déconnecter
        processQueue(refreshError, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;