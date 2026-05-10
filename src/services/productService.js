import axios from "axios";

const API_URL = "http://localhost:5278/api/Product"; // ✅ đúng

export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};