import studentService from "../../services/studentService";
import type { Student, Grade } from "../../types";
import { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button } from '@mui/material';



interface StudentReportProps {
  studentId: number;
  onClose: () => void;  // Pour fermer le modal
}

function StudentReport({ studentId, onClose }: StudentReportProps) {
  // States
  const [student, setStudent] = useState<Student | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [average, setAverage] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // useEffect pour charger les données
  useEffect(() => {
    loadData()
  }, [studentId]);

  const loadData = async () => {
    try {
      // Charger l'etudiant
      const studentResponse = await studentService.getStudentById(studentId);
      setStudent(studentResponse.data);
      // Charger ses notes
      const gradesResponse = await studentService.getStudentGrades(studentId);
      setGrades(gradesResponse.data);
      // Charger sa moyenne
      const avgResponse = await studentService.getStudentAverage(studentId);
      setAverage(avgResponse.data);

      setLoading(false);
    } catch (error) {
      console.error('Error loading student report:', error);
      setLoading(false);
    }
  }

  // Fonction pour calculer la mention
  const getMention = (avg: number): string => {
    if (avg >= 16) return "Très Bien";
    if (avg >= 14) return "Bien";
    if (avg >= 12) return "Assez Bien";
    if (avg >= 10) return "Passable";
    return "Insuffisant";
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!student) {
    return <Typography>Student not found</Typography>;
  }


  return (
    <Box sx={{ p: 3 }}>
      {/* En-tête avec nom de l'étudiant */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">
          Report Card - {student.firstName} {student.lastName}
        </Typography>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </Box>

      {/* Moyenne et mention */}
      <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Overall Average: <strong>{average.toFixed(2)} / 20</strong>
        </Typography>
        <Chip
          label={getMention(average)}
          color={average >= 10 ? "success" : "error"}
          sx={{ fontSize: '1.2rem', padding: '8px 16px' }}
        />
      </Box>

      {/* Tableau des notes */}
      <Typography variant="h6" gutterBottom>
        Grades
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>{grade.course.title}</TableCell>
                <TableCell>{grade.course.code}</TableCell>
                <TableCell>{grade.course.teacher || '-'}</TableCell>
                <TableCell align="right">
                  <Chip
                    label={`${grade.score} / 20`}
                    color={grade.score >= 10 ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {grades.length === 0 && (
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          No grades yet
        </Typography>
      )}
    </Box>
  );
}

export default StudentReport;