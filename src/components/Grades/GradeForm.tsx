import type { CreateGradeDto, Course, Student } from "../../types";
import { useEffect, useState } from "react";
import { Button, Box, TextField, MenuItem, InputProps } from '@mui/material';
import gradeService from "../../services/gradeService";
import studentService from "../../services/studentService";
import courseService from "../../services/courseService";

interface GradeFormProps {
    onSuccess: () => void;
}

function GradeForm({ onSuccess }: GradeFormProps) {
    const [score, setScore] = useState<number>(0);
    const [studentId, setStudentId] = useState<number>(0);
    const [courseId, setCourseId] = useState<number>(0);

    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        loadStudents();
        loadCourses();
    }, []);

    const loadStudents = async () => {
        const response = await studentService.getAllStudents();
        setStudents(response.data)
    };

    const loadCourses = async () => {
        const response = await courseService.getAllCourses();
        setCourses(response.data)
    };

    const handleSubmit = async () => {
        try {
            const grade: CreateGradeDto = {
                score: score,
                studentId: studentId,
                courseId: courseId
            };
            await gradeService.createGrade(grade);
            onSuccess();
        } catch (error) {
            console.error('Error creating grade:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <TextField
                label="Score"
                type="number"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                fullWidth
                margin="normal"
                slotProps={{
                    htmlInput: {
                        min: 0,
                        max: 20,
                        step: 0.5
                    }
                }}
            />

            <TextField
                select
                label="Student"
                value={studentId}
                onChange={(e) => setStudentId(Number(e.target.value))}
                fullWidth
                margin="normal"
            >
                <MenuItem value={0}>-- Select a student --</MenuItem>
                {students.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                        {student.firstName} {student.lastName}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Course"
                value={courseId}
                onChange={(e) => setCourseId(Number(e.target.value))}
                fullWidth
                margin="normal"
            >
                <MenuItem value={0}>-- Select a course --</MenuItem>
                {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                        {course.title} ({course.code})
                    </MenuItem>
                ))}
            </TextField>

            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
            >
                Save
            </Button>
        </Box>
    );

}

export default GradeForm;