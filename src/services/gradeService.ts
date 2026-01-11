import api from "./api";
import type { CreateGradeDto, Grade } from "../types";
import type { AxiosResponse } from "axios";

const gradeService = {
    // Récuperer toutes les notes
    getAllGrades: (): Promise<AxiosResponse<Grade[]>> => {
        return api.get<Grade[]>('/grades');
    },
    // Récuperer une note par ID
    getGradeById: (id: number): Promise<AxiosResponse<Grade>> => {
        return api.get<Grade>(`/grades/${id}`);
    },
    //Créer une note
    createGrade: (grade: CreateGradeDto): Promise<AxiosResponse<Grade>> => {
        return api.post<Grade>('/grades', grade);
    },
    //Modifier une note
    updateGrade: (id: number, grade: CreateGradeDto): Promise<AxiosResponse<Grade>> =>  {
        return api.put<Grade>(`/grades/${id}`, grade);
    },
    //Supprimer une note
    deleteGrade: (id: number): Promise<AxiosResponse<void>> => {
        return api.delete<void>(`/grades/${id}`);
    },
};

export default gradeService;