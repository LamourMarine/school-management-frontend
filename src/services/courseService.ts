import api from "./api";
import type { Course } from "../types";
import type { AxiosResponse } from 'axios';

const courseService = {
    // Récuperer tous les cours
    getAllCourses: (): Promise<AxiosResponse<Course[]>> => {
        return api.get<Course[]>(`/courses`);
    },
    // Récuperer un cours par ID
    getCourseById: (id: number): Promise<AxiosResponse<Course>> => {
        return api.get<Course>(`/courses/${id}`);
    },
    //Créer un cours
    createCourse: (course: Course): Promise<AxiosResponse<Course>> => {
        return api.post<Course>('/courses', course);
    },
    // Modifier un cours
    updateCourse: (id: number, course: Course): Promise<AxiosResponse<Course>> => {
        return api.put<Course>(`/courses/${id}`, course);
    },
    //Supprimer un cours
    deleteCourse: (id: number): Promise<AxiosResponse<void>> => {
        return api.delete<void>(`/courses/${id}`);
    },
    // Vérifier si le cours a des notes
    hasGrades: async (courseId: number): Promise<boolean> => {
        try {
            const response = await api.get('/grades');
            const grades = response.data;
            return grades.some((grade: any) => grade.course.id === courseId);
        } catch (error) {
            console.error('Error checking grades:', error);
            return false;
        }
    }
};

export default courseService;