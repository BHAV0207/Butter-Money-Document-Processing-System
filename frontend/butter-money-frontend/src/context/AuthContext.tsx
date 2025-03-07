import { createContext, useContext, useEffect, useState } from "react";
import { register as apiRegister, login as apiLogin, logout as apiLogout, getUser } from "../api/auth";

interface AuthContextType {
  user: any;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) setUser(storedUser);
  }, []);

  const register = async (name: string, email: string, password: string) => {
    const data = await apiRegister(name, email, password);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const login = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
