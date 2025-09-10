import User from "../models/User.js";
import School from "../models/School.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper → generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, schoolId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Validate school for student/teacher only
    if (role !== "admin") {
      const school = await School.findById(schoolId);
      if (!school) return res.status(400).json({ message: "Invalid school" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword, role, schoolId });
    await user.save();

    // Auto-login after registration
    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully 🚀",
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Profile (Protected)
export const getProfile = async (req, res) => {
  try {
    // req.user already contains full user (without password)
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
