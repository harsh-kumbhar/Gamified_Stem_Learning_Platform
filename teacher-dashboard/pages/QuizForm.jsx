import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../src/api/auth";

export default function QuizForm() {
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [questions, setQuestions] = useState([{ questionText: "", options: ["","","",""], correctAnswer: 0 }]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { getCourses().then(setCourses); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createQuiz({ title, courseId, questions });
    navigate("/dashboard/quizzes");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Quiz Title" value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded" required />
        <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className="w-full border p-2 rounded" required>
          <option value="">Select Course</option>
          {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
        </select>
        {/* Simple single question for now */}
        <div className="p-4 border rounded">
          <input type="text" placeholder="Question" value={questions[0].questionText}
            onChange={(e) => setQuestions([{...questions[0], questionText: e.target.value}])}
            className="w-full border p-2 rounded mb-2" required />
          {questions[0].options.map((opt, i) => (
            <input key={i} type="text" placeholder={`Option ${i+1}`} value={opt}
              onChange={(e) => {
                const newOptions = [...questions[0].options];
                newOptions[i] = e.target.value;
                setQuestions([{...questions[0], options: newOptions}]);
              }}
              className="w-full border p-2 rounded mb-1" required />
          ))}
          <select value={questions[0].correctAnswer}
            onChange={(e) => setQuestions([{...questions[0], correctAnswer: parseInt(e.target.value)}])}
            className="w-full border p-2 rounded">
            <option value={0}>Option 1</option>
            <option value={1}>Option 2</option>
            <option value={2}>Option 3</option>
            <option value={3}>Option 4</option>
          </select>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Create Quiz</button>
      </form>
    </div>
  );
}
