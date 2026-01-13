import type { Course } from "../../types/index";
import courseService from "../../services/courseService";
import CourseForm from "./CourseForm";
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
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useNotification } from "../../context/NotificationContext";
import ConfirmDialog from "../Common/ConfirmDialog";



function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  const { showNotification } = useNotification();


  //Charger les cours au montage du composant
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await courseService.getAllCourses();
      setCourses(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error loading courses:', error);
      setLoading(false);
    }
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsEditing(true);
    setOpenModal(true);
  }

  const handleAdd = () => {
    setSelectedCourse(undefined);
    setIsEditing(false);
    setOpenModal(true);
  }

  const handleDeleteClick = async (id: number) => {
    // Vérifier si le cours a des notes
    const hasGrades = await courseService.hasGrades(id);

    if (hasGrades) {
      showNotification(
        'Cannot delete: This course has grades. Please delete the grades first.',
        'warning'
      );
      return;
    }
    setCourseToDelete(id);
    setConfirmDialogOpen(true);
  };


  const handleDeleteConfirm = async () => {
    if (courseToDelete) {
      try {
        await courseService.deleteCourse(courseToDelete);
        showNotification('Course deleted successfully!', 'success');
        loadCourses(); //recharger la liste
      } catch (error: any) {
        console.error('Error deleting course:', error);
        showNotification('Failed to delete course', 'error');
        // Message d'erreur explicite
        if (error.response?.status === 500 || error.response?.status === 409) {
          showNotification(
            'Cannot delete: This course has grades. Please delete the grades first.',
            'error'
          );
        } else {
          showNotification('Failed to delete course', 'error');
        }
      }
    }
    setConfirmDialogOpen(false);
    setCourseToDelete(null);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
    setCourseToDelete(null);
  }

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Courses</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
        >
          Add Course
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.teacher}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(course)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => course.id && handleDeleteClick(course.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {courses.length === 0 && (
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          No courses found
        </Typography>
      )}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isEditing ? "Edit Course" : "Add New Course"}</DialogTitle>
        <DialogContent>
          <CourseForm
            courseToEdit={selectedCourse}
            onSuccess={() => {
              setOpenModal(false);
              loadCourses();
            }}
          />
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={confirmDialogOpen}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />
    </Box>
  );
}

export default CourseList;