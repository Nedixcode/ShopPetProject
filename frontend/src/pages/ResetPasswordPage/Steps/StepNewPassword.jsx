import React from "react";

export function StepNewPassword({
                                    newPassword,
                                    setNewPassword,
                                    loading,
                                    onSubmit,
                                }) {
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
                onClick={onSubmit}
                disabled={loading}
                className="requestButton"
            >
                {loading ? "⏳ Сохранение..." : "Сменить пароль"}
            </button>
        </>
    );
}
