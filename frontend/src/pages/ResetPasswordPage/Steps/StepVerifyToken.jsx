import React from "react";

export function StepVerifyToken({ token, setToken, loading, onSubmit }) {
    return (
        <>
            <h2>📧 Подтверждение кода</h2>
            <p className="text-muted">
                Введите код, который был отправлен на вашу почту
            </p>
            <input
                type="text"
                placeholder="Код из письма"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <button
                onClick={onSubmit}
                disabled={loading}
                className="requestButton"
            >
                {loading ? "⏳ Проверка..." : "Подтвердить"}
            </button>
        </>
    );
}
