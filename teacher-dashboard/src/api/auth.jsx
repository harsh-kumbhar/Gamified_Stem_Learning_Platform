import axios from "axios";

const API_URL = "/api/users";

// Register API
export const register = async (name, email, password, role,schoolId) => {
  const res = await axios.post(`${API}/register`, {
    name,
    email,
    password,
    role,
    schoolId,
  });
  return res.data;
};

export const login = async (email, password) => {
  const res = await axios.post(`${API}/login`, {
    email,
    password,
  });
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
