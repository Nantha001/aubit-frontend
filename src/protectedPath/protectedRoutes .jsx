import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ page }) {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/" replace />;
  } 

  return page;
}
