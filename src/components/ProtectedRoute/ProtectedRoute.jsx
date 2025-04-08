import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user);

  return user.accessToken ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
