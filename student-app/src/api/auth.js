// src/api/auth.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const API = `${API_BASE_URL}/api/users`;

export const register = async (name, email, password, role, schoolId) => {
  const res = await axios.post(`${API_BASE_URL}/api/users/register`, {
    name,
    email,
    password,
    role,
    schoolId,
  });
  return res.data;
};

export const login = async (email, password) => {
  const res = await axios.post(`${API}/login`, { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
