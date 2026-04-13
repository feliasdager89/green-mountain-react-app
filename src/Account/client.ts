import axios from "axios";

const REMOTE_SERVER = (
  import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000"
).replace(/\/$/, "");
const AUTH_API = `${REMOTE_SERVER}/api/auth`;

/* ================= TYPES ================= */

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "provider" | "guardian";
  created_at: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "provider" | "guardian";
};

export type AuthResponse = {
  message: string;
  token: string;
  user: User;
};

/* ================= API CALLS ================= */

export const signup = async (user: SignupPayload): Promise<AuthResponse> => {
  const response = await axios.post(`${AUTH_API}/register`, user);
  return response.data;
};

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axios.post(`${AUTH_API}/login`, credentials);
  return response.data;
};

export const profile = async (token: string): Promise<User> => {
  const response = await axios.get(`${AUTH_API}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* ================= AUTH HELPERS ================= */

export const signout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
