// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid, isAdmin } from "../utils/auth";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem("token");

    if (!isTokenValid(token)) {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin(token)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
