import React, { createContext, useState, useEffect, ReactNode } from "react";
import jwtDecode from "jwt-decode";

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

interface User {
  username: string;
  role: string;
  tenantId: string;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<User>(token);
      setUser({
        username: decoded.username,
        role: decoded.role,
        tenantId: decoded.tenantId,
        token: token,
      });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode<User>(token);
    setUser({
      username: decoded.username,
      role: decoded.role,
      tenantId: decoded.tenantId,
      token: token,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
