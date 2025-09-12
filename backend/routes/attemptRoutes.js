import express from "express";
import { startAttempt, submitAttempt, getAttemptsByStudent } from "../controllers/attemptController.js";

const router = express.Router();

// Start an attempt
router.post("/start/:quizId", startAttempt);

// Submit attempt
router.post("/submit/:quizId", submitAttempt);

// Get student’s attempt history
router.get("/:studentId", getAttemptsByStudent);

export default router;
