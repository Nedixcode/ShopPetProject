import React, { useState, useEffect, useRef } from "react";
import CustomSelect from "./CustomSelect";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";
import "../styles/SearchDropdown.css";

export default function Header() {
    const [city, setCity] = useState("Минск");
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
            try {
                const res = await fetch("/products/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query: query,
                        type: null,
                        isInStock: null,
                        minPrice: null,
                        maxPrice: null,
                        sortBy: "id",
                        sortDirection: "asc",
                        page: 0,
                        size: 100
                    })
                });

                if (!res.ok) throw new Error("Ошибка при поиске");

                const data = await res.json();
                const suggestionsData = data.content || data;
                setSuggestions(suggestionsData.slice(0, 5));
                setShowDropdown(true);
            } catch (err) {
                console.error(err);
                setSuggestions([]);
                setShowDropdown(false);
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
                                    {p.name}
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
                    <ProfileButton />
                    <button className="cart-btn">🛒 Корзина</button>
                </div>
            </div>
        </header>
    );
}
