import type { Student } from "../../types/index";
import StudentReport from "./StudentReport";
import { Dialog, DialogTitle, DialogContent, } from '@mui/material';
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
import { Delete, Edit, Assessment } from '@mui/icons-material';
import studentService from '../../services/studentService';
import { useNotification } from "../../context/NotificationContext";
import ConfirmDialog from '../Common/ConfirmDialog';



function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number>(0);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const { showNotification } = useNotification();


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


  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsEditing(true);
    setOpenModal(true);
  }

  const handleAdd = () => {
    setSelectedStudent(undefined);
    setIsEditing(false);
    setOpenModal(true);
  }

  const handleDeleteClick = async (id: number) => {
    // Verifier si l'etudiant à des notes
    const hasGrades = await studentService.hasGrades(id);

    if (hasGrades) {
      showNotification(
        'Cannot delete: This student has grades. Please delete the grades first.',
        'warning'
      );
      return;
    }
    setStudentToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (studentToDelete) {
      try {
        await studentService.deleteStudent(studentToDelete);
        showNotification('Student deleted successfully!', 'success');
        loadStudents();
      } catch (error:any) {
        console.error('Error deleting student:', error);
        showNotification('Failed to delete student', 'error');
        //Message d'erreur explicite
        if (error.response?.status === 500 || error.response?.status === 409) {
          showNotification(
            'Cannot delete: This student has grades. Please delete the grades first.',
            'error'
          );
        } else {
          showNotification('Failed to delete student', 'error');
        }
      }
    }
    setConfirmDialogOpen(false);
    setStudentToDelete(null);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
    setStudentToDelete(null);
  };

  const handleViewReport = (studentId: number) => {
    setSelectedStudentId(studentId);
    setOpenReportModal(true);
  }

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
          onClick={handleAdd}
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
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(student)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="info"
                    size="small"
                    onClick={() => student.id && handleViewReport(student.id)}
                  >
                    <Assessment />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => student.id && handleDeleteClick(student.id)}
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
      {/* Modal 1 : Add Student */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isEditing ? "Edit Student" : "Add New Student"}</DialogTitle>
        <DialogContent>
          <StudentForm
            studentToEdit={selectedStudent}
            onSuccess={() => {
              setOpenModal(false);  // Ferme le modal
              loadStudents();       // Recharge la liste
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Modal 2 : Student Report */}
      <Dialog open={openReportModal} onClose={() => setOpenReportModal(false)}>
        <DialogContent>
          <StudentReport
            studentId={selectedStudentId}
            onClose={() => setOpenReportModal(false)}
          />
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={confirmDialogOpen}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />
    </Box>
  );
}

export default StudentList;