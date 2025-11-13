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
        size: 20,
    });

    const toggle = (cat) => setOpenCategory(openCategory === cat ? null : cat);

    const categories = {
        "Тип товара": ["Электроника", "Бытовая техника", "Книги", "Одежда", "Дом", "Игрушки", "Мебель"],
        "Бренд": ["Apple", "Samsung", "Xiaomi", "Asus", "HP", "Lenovo"],
        "Цена": ["До 500 BYN", "500–1000 BYN", "1000–2000 BYN", "Выше 2000 BYN"],
    };

    const handleCheckbox = (category, item) => {
        // обновляем выбранные фильтры
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

    const applyFilters = async () => {
        try {
            const res = await fetch("/products/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedFilters),
            });

            if (!res.ok) throw new Error(`Ошибка ${res.status}`);
            const data = await res.json();

            // Передаём результат наверх (в ProductArea)
            onFilter(data.content || data);
        } catch (err) {
            console.error("Ошибка при фильтрации:", err);
            alert("Ошибка при загрузке товаров");
        }
    };

    return (
        <aside className="sidebar-left filters">
            <h2>Фильтры</h2>
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
