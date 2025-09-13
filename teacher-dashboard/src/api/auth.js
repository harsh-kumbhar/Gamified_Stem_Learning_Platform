import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Add JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Courses
export const getCourses = async () => (await API.get("/courses")).data;
export const createCourse = async (course) => (await API.post("/courses", course)).data;

// Quizzes
export const getQuizzes = async () => (await API.get("/quizzes")).data;
export const createQuiz = async (quiz) => (await API.post("/quizzes", quiz)).data;
