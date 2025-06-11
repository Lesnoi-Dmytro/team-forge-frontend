import axios from "axios";
import { AUTH_TOKEN_KEY } from "../services/auth/AuthService";

export const clientApi = axios.create({
  timeout: 5000,
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

clientApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
