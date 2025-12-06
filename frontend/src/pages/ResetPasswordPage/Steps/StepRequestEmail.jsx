import React from "react";

export function StepRequestEmail({ email, setEmail, loading, onSubmit }) {
    return (
        <>
            <h2>🔐 Восстановление пароля</h2>
            <p className="text-muted">
                Введите ваш email, чтобы получить код восстановления
            </p>
            <input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                onClick={onSubmit}
                disabled={loading}
                className="requestButton"
            >
                {loading ? "⏳ Отправка..." : "Отправить код"}
            </button>
        </>
    );
}
