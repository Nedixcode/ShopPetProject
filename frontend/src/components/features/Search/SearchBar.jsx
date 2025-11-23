import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchDropdown from "../SearchDropdown/SearchDropdown";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    // Подсказки
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
                        query,
                        type: null,
                        isInStock: null,
                        minPrice: null,
                        maxPrice: null,
                        sortBy: "id",
                        sortDirection: "asc",
                        page: 0,
                        size: 100,
                    }),
                });

                if (!res.ok) throw new Error("Ошибка при поиске");

                const data = await res.json();
                const items = data.content || data;
                setSuggestions(items.slice(0, 5));
                setShowDropdown(true);
            } catch (err) {
                console.error(err);
                setSuggestions([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(timeoutRef.current);
    }, [query]);

    // Сабмит поиска
    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate("/search", { state: { query } });
        setShowDropdown(false);
    };

    const handleSelect = (name) => {
        setQuery(name);
        setShowDropdown(false);
    };

    return (
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
                <SearchDropdown
                    suggestions={suggestions}
                    onSelect={(item) => handleSelect(item.name)}
                />
            )}
        </form>
    );
}
