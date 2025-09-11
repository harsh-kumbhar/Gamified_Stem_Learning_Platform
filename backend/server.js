import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import attemptRoutes from "./routes/attemptRoutes.js"
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gamified-stem-learning-platform.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/attempts", attemptRoutes);

// Path helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Student app
app.use("/student", express.static(path.join(__dirname, "../student-app/dist")));
app.get(/^\/student(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "../student-app/dist/index.html"));
});

// ✅ Teacher app
app.use("/teacher", express.static(path.join(__dirname, "../teacher-dashboard/dist")));
app.get(/^\/teacher(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "../teacher-dashboard/dist/index.html"));
});

// ✅ Root redirect
app.get("/", (req, res) => {
  res.redirect("/student");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
