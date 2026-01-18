export interface Student {
    id?: number;
    firstName: string;
    lastName: string;
}

export interface Course {
    id?: number;
    title: string;
    code: string;
    teacher?: string;
}

export interface Grade {
    id?: number;
    score: number;
    student: Student;
    course: Course;
}
// Type pour créer/modifier une note (ce qu'attend l'API)
export interface CreateGradeDto {
  score: number;
  studentId: number;
  courseId: number;
}

// Type pour afficher une note (ce que retourne l'API)
export interface Grade {
  id?: number;
  score: number;
  student: Student;
  course: Course;
}

export interface User {
  id?: number;
  username: String;
  email: String;
  role: String;
}

export interface LoginRequest {
  username: String;
  password: String;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}
