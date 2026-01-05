import React from 'react';
import StudentList from './components/Students/StudentList';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="lg">
      <StudentList />
    </Container>
  );
}

export default App;