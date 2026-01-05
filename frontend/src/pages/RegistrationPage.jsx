import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationCard from "../components/auth/registration/RegistrationCard";

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
