import React from "react";
import CloseButton from "../../../ui/CloseButton/CloseButton";
import "./LoginCard.css"

export default function LoginCard({ title, subtitle, children }) {
    return (
        <div className="login-card">
            <CloseButton to="/" />

                <h1>{title}</h1>
                {subtitle && <p className="login-subtitle">{subtitle}</p>}

            {children}
        </div>
    );
}
