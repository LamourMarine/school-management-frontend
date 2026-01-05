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