import axios from "axios";

// Use backend API from .env or fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getSchools = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/schools`);
  return res.data;
};
