import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute() {
  const { isAuthed, role } = useAuth();
  return isAuthed && role === "ADMIN" ? <Outlet /> : <Navigate to="/login" replace />;
}
