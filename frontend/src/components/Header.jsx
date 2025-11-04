import React, { useState, useEffect, useRef } from "react";
import CustomSelect from "./CustomSelect";
import { Link, useNavigate } from "react-router-dom";
import { parseJwt, isTokenValid } from "../utils/auth";
import "../styles/SearchDropdown.css";

export default function Header() {
    const [city, setCity] = useState("Минск");
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && isTokenValid(token)) {
            const payload = parseJwt(token);
            setUsername(payload?.sub || null);
        }
        setLoading(false);
    }, []);

    // 🔹 Динамический поиск
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
            try {
                const res = await fetch(`/products?query=${encodeURIComponent(query)}`);
                if (!res.ok) throw new Error("Ошибка при поиске");
                const data = await res.json();

                setSuggestions(data.slice(0, 5)); // максимум 5 подсказок
                setShowDropdown(true);
            } catch (err) {
                console.error(err);
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timeoutRef.current);
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/search?query=${encodeURIComponent(query.trim())}`);
        setShowDropdown(false);
    };

    return (
        <header>
            <div className="header-container">
                <div className="logo" onClick={() => navigate("/")}>🛍 Ctrl+Alt+Buy</div>

                <form className="search-box" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Поиск товаров..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query && setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    />
                    <button type="submit">🔍</button>

                    {showDropdown && suggestions.length > 0 && (
                        <ul className="search-dropdown">
                            {suggestions.map((p) => (
                                <li key={p.id} onClick={() => navigate(`/product/${p.id}`)}>
                                </li>
                            ))}
                        </ul>
                    )}
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
