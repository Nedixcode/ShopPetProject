// pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt, isTokenValid, isAdmin } from "../../utils/auth";
import LoginCard from "../../components/auth/login/LoginCard/LoginCard";
import LoginForm from "../../components/auth/login/LoginForm/LoginForm";
import "./LoginPage.css"

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
                    password: password.trim(),
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loading) handleLogin();
    };

    return (
        <div className="login-page">
            <LoginCard
                title="Вход в аккаунт"
                subtitle="Добро пожаловать Введите свои данные для входа"
            >
                <LoginForm
                    login={login}
                    password={password}
                    loading={loading}
                    onLoginChange={setLogin}
                    onPasswordChange={setPassword}
                    onSubmit={handleSubmit}
                    onForgot={() => navigate("/reset/request")}
                    onRegister={() => navigate("/auth/registration")}
                    onClose={() => navigate("/")}
                />
            </LoginCard>
        </div>
    );
}
