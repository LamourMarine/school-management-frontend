import React from 'react';
import StudentList from './components/Students/StudentList';
import { Container } from '@mui/material';
import CourseList from './components/Courses/CourseList';
import GradeList from './components/Grades/GradeList';

function App() {
  return (
    <Container maxWidth="lg">
      <StudentList />
      <CourseList />
      <GradeList />
    </Container>
  );
}

export default App;