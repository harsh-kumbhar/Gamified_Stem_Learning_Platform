import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import School from "./models/School.js";

dotenv.config();
await connectDB();

const schools = [
  { name: "Govt High School, Kandhamal", district: "Kandhamal" },
  { name: "Zilla Parishad School, Mayurbhanj", district: "Mayurbhanj" },
  { name: "Primary School, Koraput", district: "Koraput" },
  { name: "Secondary School, Kalahandi", district: "Kalahandi" },
  { name: "High School, Sundargarh", district: "Sundargarh" },
];

const seedSchools = async () => {
  try {
    await School.deleteMany(); // optional, clears old data
    await School.insertMany(schools);
    console.log("✅ Schools seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding schools:", error);
    process.exit(1);
  }
};

seedSchools();
