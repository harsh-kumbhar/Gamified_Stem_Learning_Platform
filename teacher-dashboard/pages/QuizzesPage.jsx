import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuizzes } from "../src/api/auth";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzes().then(setQuizzes);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <Link to="/dashboard/quizzes/new" className="bg-blue-600 text-white px-4 py-2 rounded">+ New Quiz</Link>
      </div>
      <ul className="space-y-2">
        {quizzes.map(q => (
          <li key={q._id} className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold">{q.title}</h2>
            <p className="text-sm text-gray-600">Course: {q.courseId?.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
