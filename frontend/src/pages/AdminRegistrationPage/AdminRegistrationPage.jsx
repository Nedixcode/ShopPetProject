import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseButton from "../../components/ui/CloseButton/CloseButton";
import { registerAdmin } from "../../api/authApi";
import { mapAdminRegisterFormToPayload } from "../../utils/registerMapper";

export default function RegistrationPage() {
    const [form, setForm] = useState({ login: "", password: "", phone: "", email: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await registerAdmin(mapAdminRegisterFormToPayload(form));

            if (res.ok) {
                alert("✅ Регистрация успешна!");
                navigate("/auth/login");
                return;
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
                <CloseButton to={"/auth/login"} />
                <h1>Регистрация</h1>
                <br />
                <p className="login-subtitle">Создайте аккаунт, чтобы оформить заказы и следить за доставкой 📦</p>
                <div className="login-form">
                    <input type="text" name="login" placeholder="Логин" value={form.login} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Пароль" value={form.password} onChange={handleChange} />
                    <input type="tel" name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />

                    <button className="modal-btn primary" onClick={handleSubmit} disabled={loading} type="button">
                        {loading ? "⏳ Регистрация..." : "Зарегистрироваться"}
                    </button>

                    <div className="register-link">
                        Уже есть аккаунт? <span onClick={() => navigate("/auth/login")}>Войти</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
