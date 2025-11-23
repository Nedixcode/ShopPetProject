import React, { useState } from "react";
import "../styles/Filters.css";

export default function Filters({ onFilter }) {
    const [openCategory, setOpenCategory] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        query: null,
        type: null,
        brand: null,
        selectedPrice: null,
        isInStock: null,
        minPrice: null,
        maxPrice: null,
        sortBy: "id",
        sortDirection: "asc",
        page: 0,
        size: 80,
    });

    const toggle = (cat) => setOpenCategory(openCategory === cat ? null : cat);

    const categories = {
        "Тип товара": ["Электроника", "Бытовая техника", "Книги", "Одежда", "Дом", "Игрушки", "Мебель"],
        "Бренд": ["Apple", "Samsung", "Xiaomi", "Asus", "HP", "Lenovo"],
        "Цена": ["До 500 BYN", "500–1000 BYN", "1000–2000 BYN", "Выше 2000 BYN"],
    };

    const handleCheckbox = (category, item) => {
        setSelectedFilters((prev) => {
            const updated = { ...prev };

            // --- Тип товара ---
            if (category === "Тип товара") {
                updated.type = item;
            }

            // --- Бренд ---
            if (category === "Бренд") {
                updated.brand = item;
            }

            // --- Цена ---
            if (category === "Цена") {
                updated.selectedPrice = item;

                switch (item) {
                    case "До 500 BYN":
                        updated.minPrice = 0;
                        updated.maxPrice = 500;
                        break;
                    case "500–1000 BYN":
                        updated.minPrice = 500;
                        updated.maxPrice = 1000;
                        break;
                    case "1000–2000 BYN":
                        updated.minPrice = 1000;
                        updated.maxPrice = 2000;
                        break;
                    case "Выше 2000 BYN":
                        updated.minPrice = 2000;
                        updated.maxPrice = null;
                        break;
                    default:
                        updated.minPrice = null;
                        updated.maxPrice = null;
                }
            }

            return updated;
        });
    };

    const applyFilters = () => onFilter(selectedFilters);

    return (
        <aside className="filters-sidebar">
            <div className="filters-section sort-section">
                <h2>Сортировка</h2>
                <div className="sort-controls">
                    <label>
                        Поле:
                        <select
                            value={selectedFilters.sortBy}
                            onChange={(e) =>
                                setSelectedFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                            }
                        >
                            <option value="price">Цена</option>
                            <option value="name">Название</option>
                        </select>
                    </label>
                    <label>
                        Направление:
                        <select
                            value={selectedFilters.sortDirection}
                            onChange={(e) =>
                                setSelectedFilters((prev) => ({ ...prev, sortDirection: e.target.value }))
                            }
                        >
                            <option value="asc">По возрастанию</option>
                            <option value="desc">По убыванию</option>
                        </select>
                    </label>
                </div>
            </div>

            {/* --- Фильтры --- */}
            <h2>Фильтры</h2>
            {Object.entries(categories).map(([title, items]) => (
                <div
                    key={title}
                    className={`filters-section filter-category ${
                        openCategory === title ? "open" : ""
                    }`}
                >
                    <div className="filter-title" onClick={() => toggle(title)}>
                        {title} <span className="toggle-icon">{openCategory === title ? "−" : "+"}</span>
                    </div>
                    <div className="filter-options">
                        {items.map((item, i) => (
                            <label key={i} className="filter-option">
                                <input
                                    type="checkbox"
                                    checked={
                                        (title === "Тип товара" && selectedFilters.type === item) ||
                                        (title === "Бренд" && selectedFilters.brand === item) ||
                                        (title === "Цена" && selectedFilters.selectedPrice === item)
                                    }
                                    onChange={() => handleCheckbox(title, item)}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button className="apply-btn" onClick={applyFilters}>
                Применить
            </button>
        </aside>
    );
}
