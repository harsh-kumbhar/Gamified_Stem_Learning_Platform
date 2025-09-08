import axios from "axios";

const API = "http://localhost:5000/api/users";

export const login = async (email, password) => {
  return axios.post(`${API}/login`, { email, password });
};

export const register = async (name, email, password, role) => {
  return axios.post(`${API}/register`, { name, email, password, role });
};
