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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    // Récupérer le token stocké
    getToken: (): string | null => {
        return localStorage.getItem('token');
    },
    //Récupérer l'utilisateur stocké
    getUser: (): string | null => {
        return localStorage.getItem('user');
    },
    // Sauvegarder le token et l'utilisateur
    saveAuthData: (token: string, user: any): void => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    } 
}

export default authService;