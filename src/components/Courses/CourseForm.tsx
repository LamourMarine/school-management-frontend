import type { Course } from "../../types/index";
import { useState } from "react";
import { Button, Box, TextField } from '@mui/material';
import courseService from "../../services/courseService";

interface CourseFormProps {
    onSuccess: () => void; // Fonction qui ne retourne rien
}

function CourseForm({ onSuccess }: CourseFormProps) {
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [teacher, setTeacher] = useState("");

    const handleSubmit = async () => {
        // Créer l'objet course
        try {
            const course: Course = {
                title: title,
                code: code,
                teacher: teacher,
            };
            await courseService.createCourse(course);
            onSuccess();
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

        return (
        <Box sx={{ p: 3 }}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Teacher"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                fullWidth
                margin="normal"
            />


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

export default CourseForm;