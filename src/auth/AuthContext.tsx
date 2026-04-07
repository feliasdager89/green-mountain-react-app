import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "../api/AuthClient";
import { clearStoredAuth, getStoredToken, getStoredUser, storeAuth } from "./authStorage";

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (nextToken: string, nextUser: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token && user),
    login: (nextToken: string, nextUser: AuthUser) => {
      storeAuth(nextToken, nextUser);
      setToken(nextToken);
      setUser(nextUser);
    },
    logout: () => {
      clearStoredAuth();
      setToken(null);
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
