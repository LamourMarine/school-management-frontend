import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';  // ← Important
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';
import GradesPage from './pages/GradesPage';

function App() {
  return (
    <NotificationProvider>  {/* ← Important */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="grades" element={<GradesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>  
  );
}

export default App;