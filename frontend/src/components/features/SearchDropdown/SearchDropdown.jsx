import React from "react";

export default function SearchDropdown({ suggestions, onSelect }) {
    return (
        <ul className="search-dropdown">
            {suggestions.map((item) => (
                <li key={item.id} onClick={() => onSelect(item)}>
                    {item.name}
                </li>
            ))}
        </ul>
    );
}
