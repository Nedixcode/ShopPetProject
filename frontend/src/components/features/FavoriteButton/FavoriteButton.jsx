import React from "react";
import { Heart } from "lucide-react";
import "./FavoriteButton.css";

export default function FavoriteButton({ onClick, disabled = false, active = false }) {
    return (
        <button
            type="button"
            className={`fav-btn ${active ? "active" : ""}`}
            onClick={onClick}
            disabled={disabled}
            aria-label="Избранное"
            title="Избранное"
        >
            <Heart size={18} fill={active ? "currentColor" : "none"} />
        </button>
    );
}
