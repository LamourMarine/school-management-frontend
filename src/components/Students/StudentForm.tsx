import type { Student } from "../../types/index";
import { useState, useEffect } from "react";
import { Button, Box, TextField } from '@mui/material';
import studentService from "../../services/studentService";
import { useNotification } from "../../context/NotificationContext";

interface StudentFormProps {
    onSuccess: () => void;  // Fonction qui ne retourne rien
    studentToEdit?: Student;
}

function StudentForm({ onSuccess, studentToEdit }: StudentFormProps) {
    const [firstName, setFirstName] = useState(studentToEdit?.firstName ||"");
    const [lastName, setLastName] = useState(studentToEdit?.lastName ||"");
    const  {showNotification}  = useNotification();

    const handleSubmit = async () => {
        // Créer l'objet student
        try {
            const student: Student = {
                firstName: firstName,
                lastName: lastName
            };

            if (studentToEdit) {
                await studentService.updateStudent(studentToEdit.id!, student);
                showNotification('Student updated successfully!', 'success');
            } else {
                await studentService.createStudent(student);
                showNotification('Student created successfully!', 'success');
            }
            onSuccess();
        } catch (error) {
            console.error('Error creating student:', error);
            showNotification('Failed to save student', 'error');
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                margin="normal"
            />

            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
            >
                {studentToEdit ? "Update" : "Save"};
            </Button>
        </Box>
    );
}

export default StudentForm;