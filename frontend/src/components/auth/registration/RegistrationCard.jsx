// src/components/auth/RegistrationCard.jsx
import React from "react";
import CloseButton from "../../ui/CloseButton/CloseButton";
import RegistrationForm from "./RegistrationForm";

export default function RegistrationCard({ onClose, onRegisterSuccess }) {
    return (
        <div className="registration-card">
            <CloseButton onClick={onClose} />
            <h1>Регистрация</h1>
            <br />
            <p className="login-subtitle">
                Создайте аккаунт, чтобы оформить заказы и следить за доставкой 📦
            </p>

            <RegistrationForm onRegisterSuccess={onRegisterSuccess} />
        </div>
    );
}
