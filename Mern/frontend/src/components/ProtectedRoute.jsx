import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" />; // Redirect to dashboard if role is not allowed
  }

  return <Outlet />; // Render the requested page
};

export default ProtectedRoute;