import type { Grade } from "../../types";
import type { Student } from "../../types";
import { Dialog, DialogTitle, DialogContent, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { tableStyles } from '../../styles/tableStyles';
import { Delete, Edit } from "@mui/icons-material";
import gradeService from "../../services/gradeService";
import GradeForm from "./GradeForm";
import { useNotification } from "../../context/NotificationContext";
import ConfirmDialog from "../Common/ConfirmDialog";

function GradeList() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | undefined>(
    undefined
  );
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [gradeToDelete, setGradeToDelete] = useState<number | null>(null);

  const { showNotification } = useNotification();

  // Charger les notes au mntage du composant
  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      const response = await gradeService.getAllGrades();
      setGrades(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading grades:", error);
      setLoading(false);
    }
  };

  const sortedGrades = [...grades].sort((a, b) => {
    // Trier par nom d'etudiant
    const studentCompare = a.student.lastName.localeCompare(b.student.lastName);
    if(studentCompare !== 0) return studentCompare;
    // Par matiere
    return a.course.title.localeCompare(b.course.title);
  })

  const handleEdit = (grade: Grade) => {
    setSelectedGrade(grade);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setSelectedGrade(undefined);
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setGradeToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (gradeToDelete) {
      try {
        await gradeService.deleteGrade(gradeToDelete);
        showNotification("Grade deleted successfully!", "success");
        loadGrades();
      } catch (error) {
        console.error("Error deleting grade:", error);
        showNotification("Failed to delete grade", "error");
      }
    }
    setConfirmDialogOpen(false);
    setGradeToDelete(null);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
    setGradeToDelete(null);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Grades</Typography>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Grades
        </Button>
      </Box>

      <TableContainer component={Paper} sx={tableStyles.container}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableStyles.headerCell}>Student</TableCell>
              <TableCell sx={tableStyles.headerCell}>Course</TableCell>
              <TableCell sx={tableStyles.headerCell}>Score</TableCell>
              <TableCell sx={tableStyles.headerCell} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedGrades.map((grade, index) => (
              <TableRow key={grade.id} 
              sx={sortedGrades[index -1]?.student.id !== grade.student.id
                ? {...tableStyles.bodyRow(index), '& td':{ borderTop: '2.5px solid #bdbdbd'}
              }
                : tableStyles.bodyRow(index)
              }>
                <TableCell sx={tableStyles.bodyCell}>
                  {sortedGrades[index -1]?.student.id !== grade.student.id
                  ? `${grade.student.lastName} ${grade.student.firstName}`
                  : ''}
                </TableCell>
                <TableCell sx={tableStyles.bodyCell}>{grade.course.title}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>{grade.score != null && grade.score !==undefined ? (
                  <Chip 
                  label={`${grade.score.toFixed(2)} /20`}
                  color={grade.score >=10 ? "success" : "error"}
                  size="small"
                  />
                ) : (
                  <Chip label="No grades" color="default" size="small" />
                )}
                </TableCell>
                <TableCell sx={tableStyles.bodyCell}align="right">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(grade)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => grade.id && handleDeleteClick(grade.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {grades.length === 0 && (
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          No grades found
        </Typography>
      )}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isEditing ? "Update" : "Add New Grade"}</DialogTitle>
        <DialogContent>
          <GradeForm
            gradeToEdit={selectedGrade}
            onSuccess={() => {
              setOpenModal(false); // Ferme le modal
              loadGrades(); // Recharge la liste
            }}
            onClose={() => setOpenModal(false)}
          />
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={confirmDialogOpen}
        title="Delete Grade"
        message="Are you sure you want to delete this grade? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />
    </Box>
  );
}

export default GradeList;
