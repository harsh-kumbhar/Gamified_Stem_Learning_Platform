import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/schools", schoolRoutes);

// Path helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve Student App
app.use("/student", express.static(path.join(__dirname, "../student-app/dist")));
app.get("/student/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../student-app/dist/index.html"));
});

// Serve Teacher Dashboard
app.use("/teacher", express.static(path.join(__dirname, "../teacher-dashboard/dist")));
app.get("/teacher/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../teacher-dashboard/dist/index.html"));
});

// (Optional) Root route → redirect to student or teacher
app.get("/", (req, res) => {
  res.redirect("/student");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
