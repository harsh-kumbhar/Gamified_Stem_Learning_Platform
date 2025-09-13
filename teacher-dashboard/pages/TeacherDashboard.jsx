import { Routes, Route, Link } from "react-router-dom";
import CourseForm from "./CourseForm"
import CoursePage from "./CoursesPage"
import QuizForm from "./QuizForm"
import QuizzesPage from "./QuizzesPage"

function TeacherDashboard() {
  return (
    <div className="teacher-dashboard">
      <nav>
        <Link to="courses">Courses</Link>
        <Link to="quizzes">Quizzes</Link>
        <Link to="create-course">Add Course</Link>
        <Link to="create-quiz">Add Quiz</Link>
      </nav>

      <Routes>
        <Route path="courses" element={<CoursePage />} />
        <Route path="quizzes" element={<QuizzesPage />} />
        <Route path="create-course" element={<CourseForm />} />
        <Route path="create-quiz" element={<QuizForm />} />
      </Routes>
    </div>
  );
}

export default TeacherDashboard;
