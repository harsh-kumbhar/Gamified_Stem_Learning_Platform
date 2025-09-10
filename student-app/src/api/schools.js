import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const getSchools = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/schools`);
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching schools:", error);
    throw error;
  }
};
