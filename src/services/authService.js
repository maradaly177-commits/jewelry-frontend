import axios from "axios";

export const login = (data) => {
  return axios.post("http://localhost:5278/api/auth/login", data);
};

export const register = (data) => {
  return axios.post("http://localhost:5278/api/auth/register", data);
};