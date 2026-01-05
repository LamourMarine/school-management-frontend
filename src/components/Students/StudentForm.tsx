import type { Student } from "../../types/index";
import { useState } from "react";
import { Button, Box, TextField } from '@mui/material';
import studentService from "../../services/studentService";

interface StudentFormProps {
    onSuccess: () => void;  // Fonction qui ne retourne rien
}

function StudentForm({ onSuccess }: StudentFormProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async () => {
        // Créer l'objet student
        try {
            const student: Student = {
                firstName: firstName,
                lastName: lastName
            };
            await studentService.createStudent(student);
            onSuccess();
        } catch (error) {
            console.error('Error creating student:', error);
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
                Save
            </Button>
        </Box>
    );
}

export default StudentForm;