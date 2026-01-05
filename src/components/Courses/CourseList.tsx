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


function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

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

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want te delete this course?')) {
            try {
                await courseService.deleteCourse(id);
                loadCourses(); //recharger la liste
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

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
          onClick={() => setOpenModal(true)}
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
                  <IconButton color="primary" size="small">
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => course.id && handleDelete(course.id)}
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
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <CourseForm
            onSuccess={() => {
              setOpenModal(false);  // Ferme le modal
              loadCourses();       // Recharge la liste
            }}
          />
        </DialogContent>
      </Dialog>

    </Box>
  );
}

export default CourseList;