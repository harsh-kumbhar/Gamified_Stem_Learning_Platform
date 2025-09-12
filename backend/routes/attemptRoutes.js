import express from "express";
import {
  startAttempt,
  submitAttempt,
  getAttemptsByStudent,
  getAttemptById,   // ✅ new controller
} from "../controllers/attemptController.js";

const router = express.Router();

// ✅ Start an attempt
router.post("/start/:quizId", startAttempt);

// ✅ Submit attempt
router.post("/submit/:quizId", submitAttempt);

// ✅ Get student’s attempt history
router.get("/student/:studentId", getAttemptsByStudent);

// ✅ Get a single attempt result by attemptId
router.get("/:attemptId", getAttemptById);

export default router;
