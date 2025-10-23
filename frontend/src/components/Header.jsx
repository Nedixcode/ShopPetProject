import React, { useState, useEffect } from "react";
import CustomSelect from "./CustomSelect";
import { Link } from "react-router-dom";
import { parseJwt, isTokenValid } from "../utils/auth";

export default function Header() {
    const [city, setCity] = useState("Минск");
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // имитируем быструю проверку, чтобы успел показаться спиннер
        setTimeout(() => {
            if (token && isTokenValid(token)) {
                const payload = parseJwt(token);
                setUsername(payload?.sub || null);
            } else {
                setUsername(null);
            }
            setLoading(false);
        }, 100);
    }, []);

    return (
        <header>
            <div className="header-container">
                <div className="logo">🛍 Ctrl+Alt+Buy</div>

                <div className="search-box">
                    <input type="text" placeholder="Поиск товаров..." />
                    <button>🔍</button>
                </div>

                <div className="header-actions">
                    <CustomSelect
                        options={["Минск", "Могилев", "Гродно", "Брест", "Витебск", "Гомель"]}
                        value={city}
                        onChange={setCity}
                    />

                    {loading ? (
                        <div className="spinner" title="Проверка входа..." />
                    ) : username ? (
                        <>
                            <Link to="/profile" className="auth-btn">
                                {username}
                            </Link>
                        </>
                    ) : (
                        <Link to="/auth/login" className="auth-btn">
                            Войти
                        </Link>
                    )}

                    <button className="cart-btn">🛒 Корзина</button>
                </div>
            </div>
        </header>
    );
}
