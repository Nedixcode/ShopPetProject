import React, { useState } from "react";

export default function LoginModal({ open, onClose }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: login,
                    password: password
                }),
            });

            const result = await response.text();
            const isSuccess = result.trim().toLowerCase() === 'true';

            console.log("Ответ от сервера:", result);

            if (isSuccess) {
                alert("✅ Успешный вход!");
                onClose();
            } else {
                alert("❌ Неверный логин или пароль");
            }
        } catch (error) {
            console.error("Ошибка при авторизации:", error);
            alert("Произошла ошибка при входе");
        }
    };

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

                    <button className="modal-btn primary" onClick={handleLogin}>Войти</button>

                    <div className="modal-alt">
                        <button className="modal-btn secondary">📱 Войти по номеру телефона</button>
                        <button className="forgot-btn">Забыли пароль?</button>
                    </div>
                </div>
            </div>
        </div>
    );
}



