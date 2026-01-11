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

