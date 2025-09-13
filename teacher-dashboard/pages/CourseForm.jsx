import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../src/api/auth";

export default function CourseForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCourse({ title, description, grade });
    navigate("/dashboard/courses");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded" required />
        <textarea placeholder="Description" value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded" />
        <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full border p-2 rounded">
          <option value="">Select Grade</option>
          {[6,7,8,9,10,11,12].map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}
