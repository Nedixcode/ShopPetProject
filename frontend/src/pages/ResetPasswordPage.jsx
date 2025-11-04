import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseButton from "../components/CloseButton";

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRequestReset = async () => {
        if (!email.trim()) return alert("Введите email");
        setLoading(true);
        try {
            const res = await fetch(`/auth/reset-password-request?email=${encodeURIComponent(email)}`, {
                method: "POST",
            });
            if (res.ok) {
                alert("✅ Код для восстановления отправлен на почту!");
                setStep(2);
            } else {
                alert("⚠️ Ошибка: проверьте email");
            }
        } catch (e) {
            console.error(e);
            alert("Ошибка соединения с сервером");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyToken = async () => {
        if (!token.trim()) return alert("Введите код из письма");
        setLoading(true);
        try {
            const res = await fetch(`/auth/verify-reset-code?token=${encodeURIComponent(token)}`, {
                method: "POST",
            });
            if (res.ok) {
                alert("✅ Код подтверждён!");
                setStep(3);
            } else {
                alert("❌ Неверный или просроченный код");
            }
        } catch (e) {
            console.error(e);
            alert("Ошибка соединения с сервером");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (newPassword.trim().length < 6)
            return alert("Пароль должен быть не короче 6 символов");
        setLoading(true);
        try {
            const res = await fetch("/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });
            if (res.ok) {
                alert("✅ Пароль успешно изменён!");
                navigate("/auth/login");
            } else {
                alert("⚠️ Ошибка при изменении пароля");
            }
        } catch (e) {
            console.error(e);
            alert("Ошибка соединения с сервером");
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h2>🔐 Восстановление пароля</h2>
                        <p className="text-muted">Введите ваш email, чтобы получить код восстановления</p>
                        <input
                            type="email"
                            placeholder="Ваш email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={handleRequestReset}
                            disabled={loading}
                            className={"requestButton"}
                        >
                            {loading ? "⏳ Отправка..." : "Отправить код"}
                        </button>
                    </>
                );
            case 2:
                return (
                    <>
                        <h2>📧 Подтверждение кода</h2>
                        <p className="text-muted">Введите код, который был отправлен на вашу почту</p>
                        <input
                            type="text"
                            placeholder="Код из письма"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                        <button
                            onClick={handleVerifyToken}
                            disabled={loading}
                            className={"requestButton"}
                        >
                            {loading ? "⏳ Проверка..." : "Подтвердить"}
                        </button>
                    </>
                );
            case 3:
                return (
                    <>
                        <h2>🔑 Новый пароль</h2>
                        <p className="text-muted">Введите новый надёжный пароль</p>
                        <input
                            type="password"
                            placeholder="Новый пароль"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            onClick={handleResetPassword}
                            disabled={loading}
                            className={"requestButton"}
                        >
                            {loading ? "⏳ Сохранение..." : "Сменить пароль"}
                        </button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="reset-page">
            <div className="reset-card">
                <CloseButton to="/auth/login" />
                <div className="reset-content">{renderStep()}</div>

                {step > 1 && (
                    <button
                        className="back-btn"
                        onClick={() => setStep(step - 1)}
                        disabled={loading}
                    >
                        ← Назад
                    </button>
                )}
                <br/>
                <br/>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
