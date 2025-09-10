import express from "express";
import School from "../models/School.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
