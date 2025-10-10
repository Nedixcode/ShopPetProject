import React, { useState } from "react";

export default function LoginModal({ open, onClose }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✖</button>
                <h2>Вход в аккаунт</h2>

                <div className="modal-form">
                    <input
                        type="text"
                        placeholder="Логин или Email"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="modal-btn primary">Войти</button>

                    <div className="modal-alt">
                        <button className="modal-btn secondary">📱 Войти по номеру телефона</button>
                        <button className="forgot-btn">Забыли пароль?</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
