import React from "react";
import "./Spinner.css";

export default function Spinner({ text = "Загрузка...", size = "large" }) {
    return (
        <div className="spinner-wrapper">
            <div className={`spinner ${size}`} />
            <p className="spinner-text">{text}</p>
        </div>
    );
}
