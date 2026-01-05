import type { Student } from "../../types/index";
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import StudentForm from './StudentForm';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import studentService from '../../services/studentService';




function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  //Charger les étudiants au montage du composant
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await studentService.getAllStudents();
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading students:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        loadStudents(); //recharger la liste
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Students</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Add Student
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" size="small">
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => student.id && handleDelete(student.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {students.length === 0 && (
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          No students found
        </Typography>
      )}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <StudentForm
            onSuccess={() => {
              setOpenModal(false);  // Ferme le modal
              loadStudents();       // Recharge la liste
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default StudentList;