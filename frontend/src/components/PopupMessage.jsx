import React, { useEffect, useState } from "react";
import "../styles/PopupMessage.css";

export default function PopupMessage({ message, type = "info", onClose }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 300);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div
            className={`popup-message popup-${type} ${
                visible ? "popup-show" : "popup-hide"
            }`}
        >
            <div className="popup-content">
                <span>{message}</span>
                <button onClick={onClose} className="popup-close">
                    ×
                </button>
            </div>
        </div>
    );
}
