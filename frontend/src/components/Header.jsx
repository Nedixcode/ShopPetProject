import React, { useState, useEffect, useRef } from "react";
import CustomSelect from "./CustomSelect";
import { Link, useNavigate } from "react-router-dom";
import { parseJwt, isTokenValid } from "../utils/auth";

export default function Header() {
    const [city, setCity] = useState("Минск");
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
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

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    };

    return (
        <header>
            <div className="header-container">
                <div className="logo">🛍 Ctrl+Alt+Buy</div>

                <form className="search-box" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Поиск товаров..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit">🔍</button>
                </form>

                <div className="header-actions">
                    <CustomSelect
                        options={["Минск", "Могилев", "Гродно", "Брест", "Витебск", "Гомель"]}
                        value={city}
                        onChange={setCity}
                    />

                    {loading ? (
                        <div className="spinner" title="Проверка входа..." />
                    ) : username ? (
                        <Link to="/profile" className="auth-btn">
                            {username}
                        </Link>
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
