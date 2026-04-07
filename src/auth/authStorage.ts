import type { AuthUser } from "../api/AuthClient";

const TOKEN_KEY = "token";
const USER_KEY = "green_mountain_user";

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch (error) {
    console.error("Unable to parse stored user:", error);
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const storeAuth = (token: string, user: AuthUser) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
