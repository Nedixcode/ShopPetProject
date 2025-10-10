import React, { useState } from "react";

export default function Filters() {
    const [openCategory, setOpenCategory] = useState(null);
    const toggle = (cat) => setOpenCategory(openCategory === cat ? null : cat);

    const categories = {
        "Тип товара": ["Смартфоны", "Ноутбуки", "Аксессуары", "Игровая техника"],
        "Бренд": ["Apple", "Samsung", "Xiaomi", "Asus", "HP", "Lenovo"],
        "Цена": ["До 500 BYN", "500–1000 BYN", "1000–2000 BYN", "Выше 2000 BYN"],
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
                                <input type="checkbox" /> {item}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </aside>
    );
}
