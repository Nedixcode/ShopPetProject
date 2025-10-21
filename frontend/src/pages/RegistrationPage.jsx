import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
    const [form, setForm] = useState({
        login: "",
        password: "",
        phone: "",
        email: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch("/auth/registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userName : form.login,
                    password : form.password,
                    email : form.email,
                    phoneNumber : form.phone
                }),
            });

            if (response.ok) {
                alert("✅ Регистрация успешна!");
                navigate("/auth/login");
            } else {
                alert("❌ Ошибка регистрации");
            }
        } catch (err) {
            console.error("Ошибка регистрации:", err);
            alert("Произошла ошибка");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-page">
            <div className="registration-card">
                <h1>Регистрация</h1>
                <br/>
                <p className="login-subtitle">
                    Создайте аккаунт, чтобы оформить заказы и следить за доставкой 📦
                </p>

                <div className="login-form">
                    <input
                        type="text"
                        name="login"
                        placeholder="Логин"
                        value={form.login}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Телефон"
                        value={form.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <button
                        className="modal-btn primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "⏳ Регистрация..." : "Зарегистрироваться"}
                    </button>

                    <div className="register-link">
                        Уже есть аккаунт?{" "}
                        <span onClick={() => navigate("/auth/login")}>Войти</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
