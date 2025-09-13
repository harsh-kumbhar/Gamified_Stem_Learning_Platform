import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TeacherDashboard from "../pages/TeacherDashboard";
import CoursesPage from "../pages/CoursesPage";
import QuizzesPage from "../pages/QuizzesPage";
import CourseForm from "../pages/CourseForm";
import QuizForm from "../pages/QuizForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<TeacherDashboard />}>
          <Route index element={<Navigate to="courses" />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/new" element={<CourseForm />} />
          <Route path="quizzes" element={<QuizzesPage />} />
          <Route path="quizzes/new" element={<QuizForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
