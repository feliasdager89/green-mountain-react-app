import axios from "axios";

const AUTH_API_URL = "http://localhost:4000/api/auth";

export type AuthUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "provider" | "guardian";
  created_at?: string;
};

export type LoginResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

export type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "provider" | "guardian";
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const registerUser = async (payload: RegisterPayload) => {
  const response = await axios.post(`${AUTH_API_URL}/register`, payload);
  return response.data as AuthUser;
};

export const loginUser = async (payload: LoginPayload) => {
  const response = await axios.post(`${AUTH_API_URL}/login`, payload);
  return response.data as LoginResponse;
};
