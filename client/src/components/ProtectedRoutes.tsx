import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if the token exists in local storage
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If a token exists, render the child component (e.g., the Dashboard)
  return <Outlet />;
};

export default ProtectedRoute;
