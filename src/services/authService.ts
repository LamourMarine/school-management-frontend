import api from "./api";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../types";
import type { AxiosResponse } from "axios";

const authService = {
    login: (credentials: LoginRequest): Promise<AxiosResponse<AuthResponse>> => {
        return api.post<AuthResponse>('/auth/login', credentials);
    },
    register: (credentials: RegisterRequest): Promise<AxiosResponse<AuthResponse>> => {
        return api.post<AuthResponse>('/auth/register', credentials);
    }, 
    // Logout (côté client - supprime le token)
    logout: (): void => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },
    // Récupérer le token stocké
    getAccessToken: (): string | null => {
        return localStorage.getItem('accessToken');
    },
    // Récupérer le refresh token stocké
    getRefreshToken: (): string | null => {  // ← AJOUTÉ
        return localStorage.getItem('refreshToken');
    },
    //Récupérer l'utilisateur stocké
    getUser: (): string | null => {
        return localStorage.getItem('user');
    },
    // Sauvegarder le token et l'utilisateur
    saveAuthData: (accessToken: string, refreshToken: string, user: any): void => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
    }, 
    // Rafraîchir l'access token
    refreshAccessToken: async (): Promise<string | null> => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                return null;
            }

            const response = await api.post<AuthResponse>('/auth/refresh', {
                refreshToken: refreshToken
            });

            const { accessToken, refreshToken: newRefreshToken, username, role } = response.data;

            // Mettre à jour les tokens dans le localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            return accessToken;
        } catch (error) {
            // Si le refresh échoue, déconnecter l'utilisateur
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            return null;
        }
    }
}

export default authService;