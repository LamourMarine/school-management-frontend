import api from "./api";
import type { Student } from "../types/index";
import type {AxiosResponse}  from 'axios';

const studentService = {
  // Récupérer tous les étudiants
  getAllStudents: (): Promise<AxiosResponse<Student[]>> => {
    return api.get<Student[]>('/students');
  },
  // Récupérer un étudiant par ID
  getStudentById: (id: number): Promise<AxiosResponse<Student>> => {
    return api.get<Student>(`/students/${id}`);
},
  // Créer un étudiant
createStudent: (student: Student): Promise<AxiosResponse<Student>> => {
  return api.post<Student>('/students', student);
},
  // Modifier un étudiant
  updateStudent: (id: number, student: Student): Promise<AxiosResponse<Student>> => {
    return api.put<Student>(`/students/${id}`, student);
},
  // Supprimer un étudiant
  deleteStudent: (id: number): Promise<AxiosResponse<void>> => {
    return api.delete<void>(`/students/${id}`);
},
  // Récupérer les notes d'un étudiant
  getStudentGrades: (id: number): Promise<AxiosResponse<any>> => {
    return api.get<any>(`/students/${id}/grades`);
},
  // Récupérer la moyenne d'un étudiant
  getStudentAverage: (id: number): Promise<AxiosResponse<number>> => {
    return api.get<number>(`/students/${id}/average`);
},
};

export default studentService;