import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Teacher Dashboard</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/dashboard/courses" className="hover:bg-blue-700 p-2 rounded">📘 Courses</Link>
        <Link to="/dashboard/quizzes" className="hover:bg-blue-700 p-2 rounded">📝 Quizzes</Link>
      </nav>
    </div>
  );
}
