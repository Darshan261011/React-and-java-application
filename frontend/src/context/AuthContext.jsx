import { createContext, useContext, useMemo, useState } from "react";
import { loginUser, registerUser } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => ({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    name: localStorage.getItem("name")
  }));

  const login = async (payload) => {
    const { data } = await loginUser(payload);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("name", data.name);
    setAuth(data);
    return data;
  };

  const register = (payload) => registerUser(payload);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setAuth({ token: null, role: null, name: null });
  };

  const value = useMemo(() => ({ ...auth, isAuthed: Boolean(auth.token), login, register, logout }), [auth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
