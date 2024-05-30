import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AuthProvider from './contexts/AuthContext';
import UserProvider from './contexts/UserContext';
import CreateCoursePage from './pages/CreateCoursePage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-course" element={<CreateCoursePage />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>  
  );
};

export default App;