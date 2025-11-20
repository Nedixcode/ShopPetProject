import React, { useState } from "react";

export default function Filters({ onFilter }) {
    const [openCategory, setOpenCategory] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        query: null,
        type: null,
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

            if (category === "Тип товара") updated.type = item;

            if (category === "Цена") {
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

    const applyFilters = () => {
        onFilter(selectedFilters);
    };

    return (
        <aside className="sidebar-left filters">
            <h2>Фильтры</h2>

            {/* --- Блок сортировки --- */}
            <div className="sort-controls">
                <h3>Сортировка</h3>

                <label>
                    Поле:
                    <select
                        value={selectedFilters.sortBy}
                        onChange={(e) =>
                            setSelectedFilters((prev) => ({
                                ...prev,
                                sortBy: e.target.value,
                            }))
                        }
                    >
                        <option value="id">ID</option>
                        <option value="price">Цена</option>
                        <option value="name">Название</option>
                    </select>
                </label>

                <label>
                    Направление:
                    <select
                        value={selectedFilters.sortDirection}
                        onChange={(e) =>
                            setSelectedFilters((prev) => ({
                                ...prev,
                                sortDirection: e.target.value,
                            }))
                        }
                    >
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                    </select>
                </label>
            </div>

            {/* --- Категории фильтров --- */}
            {Object.entries(categories).map(([title, items]) => (
                <div key={title} className={`filter-category ${openCategory === title ? "open" : ""}`}>
                    <div className="filter-title" onClick={() => toggle(title)}>
                        <span>{title}</span>
                        <span>{openCategory === title ? "−" : "+"}</span>
                    </div>
                    <div className="filter-options">
                        {items.map((item, i) => (
                            <label key={i}>
                                <input
                                    type="checkbox"
                                    name={title}
                                    onChange={() => handleCheckbox(title, item)}
                                />{" "}
                                {item}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button onClick={applyFilters}>Применить</button>
        </aside>
    );
}
