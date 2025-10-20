import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userName: login,
                    password: password
                }),
            });

            const result = await response.text();
            if (result) {
                alert("✅ Успешный вход!");
                navigate("/");
            } else {
                alert("❌ Неверный логин или пароль");
            }
        } catch (error) {
            console.error("Ошибка при авторизации:", error);
            alert("Произошла ошибка при входе");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Вход в аккаунт</h1>
                <p className="login-subtitle">Добро пожаловать 👋 Введите свои данные для входа</p>

                <div className="login-form">
                    <input
                        type="text"
                        placeholder="Логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="modal-btn primary"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "⏳ Вход..." : "Войти"}
                    </button>
                    <div className="register-link">
                        Впервые на сайте?{" "}
                        <span onClick={() => navigate("/auth/registration")}>Регистрация</span>
                    </div>
                    <button className="forgot-btn">Забыли пароль?</button>
                </div>
            </div>
        </div>
    );
}
