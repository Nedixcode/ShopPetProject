// src/pages/RegistrationPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import CloseButton from "../components/ui/CloseButton/CloseButton";
import RegistrationCard from "../components/auth/RegistrationCard";

export default function RegistrationPage() {
    const navigate = useNavigate();

    return (
        <div className="registration-page">
            <RegistrationCard
                onClose={() => navigate("/auth/login")}
                onRegisterSuccess={() => navigate("/auth/login")}
            />
        </div>
    );
}
