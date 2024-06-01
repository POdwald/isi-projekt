import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AuthProvider from './contexts/AuthContext';
import UserProvider from './contexts/UserContext';
import CreateCoursePage from './pages/CreateCoursePage';
import CourseDetailPage from './pages/CourseDetailPage';
import CourseWelcomePage from './pages/CourseWelcomePage';
import ModulePage from './pages/ModulePage';
import LessonPage from './pages/LessonPage';
import ExamPage from './pages/ExamPage';
import ExamAttemptPage from './pages/ExamAttemptPage';
import ExamScorePage from './pages/ExamScorePage';

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
            <Route path="/learn/:courseSlug" element={<CourseDetailPage />} />
            <Route path="/learn/:courseSlug/home/welcome" element={<CourseWelcomePage />} />
            <Route path="/learn/:courseSlug/home/module/:moduleId" element={<ModulePage />} />
            <Route path="/learn/:courseSlug/home/module/:moduleId/lesson/:lessonSlug" element={<LessonPage />} />
            <Route path="/learn/:courseSlug/home/module/:moduleId/exam/:examSlug" element={<ExamPage />} />
            <Route path="/learn/:courseSlug/home/module/:moduleId/exam/:examSlug/attempt" element={<ExamAttemptPage />} />
            <Route path="/learn/:courseSlug/home/module/:moduleId/exam/:examSlug/score" element={<ExamScorePage />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>  
  );
};

export default App;