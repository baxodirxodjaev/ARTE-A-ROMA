import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner/>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
