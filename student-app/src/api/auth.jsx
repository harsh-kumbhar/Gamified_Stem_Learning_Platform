import axios from "axios";

const API = "http://localhost:5000/api/users";

// Login API
export const login = async (email, password) => {
  const { data } = await axios.post(`${API}/login`, { email, password });
  return data;
};

// Register API
export const register = async (name, email, password, role) => {
  const { data } = await axios.post(`${API}/register`, {
    name,
    email,
    password,
    role,
  });
  return data;
};
