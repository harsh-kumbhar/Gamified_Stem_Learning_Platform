import express from "express";
import { createCourse, getCourses } from "../controllers/courseController.js";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Teacher only
router.post("/", protect, authorizeRole("teacher"), createCourse);

// Public
router.get("/", getCourses);

export default router;
