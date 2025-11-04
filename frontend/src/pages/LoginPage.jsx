import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt, isTokenValid, isAdmin } from "../utils/auth";
import CloseButton from "../components/CloseButton";

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
                    userName: login.trim(),
                    password: password.trim()
                }),
            });

            if (response.status === 401) {
                alert("❌ Неверный логин или пароль");
                return;
            }

            if (!response.ok) {
                alert("⚠️ Ошибка сервера. Попробуйте позже.");
                return;
            }

            const data = await response.json();

            if (!data.token) {
                alert("🚨 Сервер не вернул токен!");
                return;
            }

            localStorage.setItem("token", data.token);

            if (!isTokenValid(data.token)) {
                alert("⚠️ Токен недействителен. Войдите снова.");
                localStorage.removeItem("token");
                return;
            }

            const payload = parseJwt(data.token);
            const username = payload?.sub;
            const admin = isAdmin(data.token);

            alert(`✅ Успешный вход! Добро пожаловать, ${username}!`);
            if (admin) {
                navigate("/admin");
            } else {
                navigate("/");
                location.reload();
            }

        } catch (error) {
            console.error("Ошибка при авторизации:", error);
            alert("🚨 Ошибка соединения с сервером");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleLogin();
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <CloseButton to={"/"}/>
                <h1>Вход в аккаунт</h1>
                <p className="login-subtitle">Добро пожаловать 👋 Введите свои данные для входа</p>

                <div className="login-form">
                    <input
                        type="text"
                        placeholder="Логин"
                        value={login}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        className="modal-btn primary"
                        onClick={handleLogin}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    >
                        {loading ? "⏳ Вход..." : "Войти"}
                    </button>
                    <div className="register-link">
                        Впервые на сайте?{" "}
                        <span onClick={() => navigate("/auth/registration")}>Регистрация</span>
                    </div>
                    <button
                        className="forgot-btn"
                        onClick={() => navigate("/reset/request")}
                    >
                        Забыли пароль?
                    </button>
                </div>
            </div>
        </div>
    );
}
