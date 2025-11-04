import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CloseButton.css";

export default function CloseButton({ to = "/", title = "На главную", small = false }) {
    const navigate = useNavigate();

    return (
        <button
            className={`close-btn ${small ? "small" : ""}`}
            onClick={() => navigate(to)}
            title={title}
            aria-label="Закрыть"
        >
            <span className="close-icon">✖</span>
        </button>
    );
}
