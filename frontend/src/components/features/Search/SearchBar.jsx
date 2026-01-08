import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import useSearchSuggestions from "../../../hooks/useSearchSuggestions";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const {suggestions, loading} = useSearchSuggestions(query);
    const navigate = useNavigate();
    const formRef = useRef(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (!query.trim()){
            navigate("/", { state: null });
            return;
        }
        navigate("/search", { state: { query } });
        setShowDropdown(false);
    };

    const handleSelect = (name) => {
        setQuery(name);
        setShowDropdown(false);
        formRef.current?.requestSubmit();
    };

    useEffect(() => {
        if (query.trim() && suggestions.length > 0) setShowDropdown(true);
        if (!query.trim()) setShowDropdown(false);
    }, [query, suggestions]);

    return (
        <form ref={formRef} className="search-box" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Поиск товаров..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
            />
            <button>🔍</button>

            {showDropdown && !loading && suggestions.length > 0 && (
                <SearchDropdown
                    suggestions={suggestions}
                    onSelect={(item) => handleSelect(item.name)}
                />
            )}
        </form>
    );
}
