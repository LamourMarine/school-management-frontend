import React from 'react';
import StudentList from './components/Students/StudentList';
import { Container } from '@mui/material';
import CourseList from './components/Courses/CourseList';

function App() {
  return (
    <Container maxWidth="lg">
      <StudentList />
      <CourseList />
    </Container>
  );
}

export default App;