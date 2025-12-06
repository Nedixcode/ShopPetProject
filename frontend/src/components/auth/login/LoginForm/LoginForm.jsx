import React from "react";
import "./LoginForm.css"

export default function LoginForm({
                                      login,
                                      password,
                                      loading,
                                      onLoginChange,
                                      onPasswordChange,
                                      onSubmit,
                                      onForgot,
                                      onRegister,
                                  }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit(e);
        }
    };

    return (
        <form className="login-form" onSubmit={onSubmit}>
            <div className="login-field">
                <label htmlFor="login">Логин</label>
                <input
                    id="login"
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => onLoginChange(e.target.value)}
                    required
                />
            </div>

            <div className="login-field">
                <label htmlFor="password">Пароль</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    required
                />
            </div>

            <button
                type="submit"
                className="modal-btn primary login-submit"
                disabled={loading}
            >
                {loading ? "⏳ Вход..." : "Войти"}
            </button>

            <div className="login-links">
                <button
                    type="button"
                    className="forgot-btn"
                    onClick={onForgot}
                >
                    Забыли пароль?
                </button>

                <div className="register-link">
                    Впервые на сайте?{" "}
                    <span onClick={onRegister}>Регистрация</span>
                </div>
            </div>
        </form>
    );
}
