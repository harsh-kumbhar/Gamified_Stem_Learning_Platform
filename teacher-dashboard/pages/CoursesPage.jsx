import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/courses";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link to="/dashboard/courses/new" className="bg-blue-600 text-white px-4 py-2 rounded">+ New Course</Link>
      </div>
      <ul className="space-y-2">
        {courses.map(c => (
          <li key={c._id} className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold">{c.title}</h2>
            <p className="text-sm text-gray-600">{c.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
