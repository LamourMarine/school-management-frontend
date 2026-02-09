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
    // Logout - appeler le backend + supprimer le localStorage
    logout: async (): Promise<void> => {
        try {
            await api.post('/auth/logout'); // Appel backend pour supprimer le cookie
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        }
    },
    // Récupérer le token stocké
    getAccessToken: (): string | null => {
        return localStorage.getItem('accessToken');
    },
    // Récupérer le refresh token stocké
    getRefreshToken: (): string | null => {  //
        return localStorage.getItem('refreshToken');
    },
    //Récupérer l'utilisateur stocké
    getUser: (): string | null => {
        return localStorage.getItem('user');
    },
    // Sauvegarder l'access token et l'utilisateur
    saveAuthData: (accessToken: string, user: any): void => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
    },
}

export default authService;