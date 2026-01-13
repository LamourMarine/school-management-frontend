import type { Course } from "../../types/index";
import { useState } from "react";
import { Button, Box, TextField } from '@mui/material';
import courseService from "../../services/courseService";
import { useNotification } from "../../context/NotificationContext";


interface CourseFormProps {
    onSuccess: () => void; // Fonction qui ne retourne rien
    courseToEdit?: Course;
}

function CourseForm({ onSuccess, courseToEdit }: CourseFormProps) {
    const [title, setTitle] = useState(courseToEdit?.title ||"");
    const [code, setCode] = useState(courseToEdit?.code ||"");
    const [teacher, setTeacher] = useState(courseToEdit?.teacher ||"");
    const  {showNotification}  = useNotification();

    const handleSubmit = async () => {
        // Créer l'objet course
        try {
            const course: Course = {
                title: title,
                code: code,
                teacher: teacher,
            };

            if(courseToEdit) {
                await courseService.updateCourse(courseToEdit.id!, course);
                showNotification('Course updated successfully!', 'success');
            } else {
                await courseService.createCourse(course);
                showNotification('Course created successfully!', 'success');
            }
            onSuccess();
        } catch (error) {
            console.error('Error creating course:', error);
            showNotification('Failed to save course', 'error');
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
                {courseToEdit ? "Update" : "Save"};
            </Button>
        </Box>
    );
} 

export default CourseForm;