import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    district: { type: String, required: true },
    state: { type: String, default: "Odisha" },
  },
  { timestamps: true }
);

const School = mongoose.model("School", schoolSchema);
export default School;
