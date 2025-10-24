import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  // if not logged in, redirect to login page
  if (!loggedInUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}
