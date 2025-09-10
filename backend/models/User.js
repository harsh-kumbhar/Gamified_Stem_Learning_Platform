import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["student", "teacher", "admin"] },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",   // 👈 links to schoolModel.js
      required: true,
    },  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
