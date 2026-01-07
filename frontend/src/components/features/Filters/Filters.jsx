import React, { useMemo, useState } from "react";
import "./Filters.css";

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

    const categories = useMemo(
        () => ({
            "Тип товара": ["Электроника", "Бытовая техника", "Книги", "Одежда", "Дом", "Игрушки", "Мебель"],
            "Бренд": ["Apple", "Samsung", "Xiaomi", "Asus", "HP", "Lenovo"],
            "Цена": ["До 500 BYN", "500–1000 BYN", "1000–2000 BYN", "Выше 2000 BYN"],
            "Наличие": ["В наличии", "Нет в наличии"],
        }),
        []
    );

    const selectedCount = useMemo(() => {
        let c = 0;
        if (selectedFilters.type) c++;
        if (selectedFilters.brand) c++;
        if (selectedFilters.selectedPrice) c++;
        if (selectedFilters.isInStock !== null) c++;
        return c;
    }, [selectedFilters]);

    const toggle = (cat) => setOpenCategory((prev) => (prev === cat ? null : cat));

    const handleSingleSelect = (category, item) => {
        setSelectedFilters((prev) => {
            const updated = { ...prev };

            if (category === "Тип товара") updated.type = prev.type === item ? null : item;

            if (category === "Бренд") updated.brand = prev.brand === item ? null : item;

            if (category === "Цена") {
                const next = prev.selectedPrice === item ? null : item;
                updated.selectedPrice = next;

                if (!next) {
                    updated.minPrice = null;
                    updated.maxPrice = null;
                } else {
                    switch (next) {
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
            }

            if (category === "Наличие") {
                if (item === "В наличии") updated.isInStock = prev.isInStock === true ? null : true;
                if (item === "Нет в наличии") updated.isInStock = prev.isInStock === false ? null : false;
            }

            return updated;
        });
    };

    const applyFilters = () => onFilter?.(selectedFilters);

    const resetFilters = () => {
        setSelectedFilters((prev) => ({
            ...prev,
            type: null,
            brand: null,
            selectedPrice: null,
            isInStock: null,
            minPrice: null,
            maxPrice: null,
            sortBy: "id",
            sortDirection: "asc",
            page: 0,
            size: prev.size ?? 80,
        }));
        onFilter?.({
            ...selectedFilters,
            type: null,
            brand: null,
            selectedPrice: null,
            isInStock: null,
            minPrice: null,
            maxPrice: null,
            sortBy: "id",
            sortDirection: "asc",
            page: 0,
        });
    };

    return (
        <aside className="filtersSidebar" aria-label="Фильтры и сортировка">
            <div className="filtersHeader">
                {selectedCount > 0 ? (
                    <div className="filtersBadge" title="Количество активных фильтров">
                        Активно: {selectedCount}
                    </div>
                ) : (
                    <div className="filtersBadge muted">Нет фильтров</div>
                )}
            </div>
            <div className="divider" />
            <div className="filtersCardSection">
                <div className="sectionTitle">Сортировка</div>

                <div className="field">
                    <label className="label" htmlFor="sortBy">Поле</label>
                    <select
                        id="sortBy"
                        className="control"
                        value={selectedFilters.sortBy}
                        onChange={(e) => setSelectedFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                    >
                        <option value="id">По умолчанию</option>
                        <option value="price">Цена</option>
                        <option value="name">Название</option>
                    </select>
                </div>

                <div className="field">
                    <label className="label" htmlFor="sortDir">Направление</label>
                    <select
                        id="sortDir"
                        className="control"
                        value={selectedFilters.sortDirection}
                        onChange={(e) => setSelectedFilters((prev) => ({ ...prev, sortDirection: e.target.value }))}
                    >
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                    </select>
                </div>
            </div>

            <div className="divider" />
            <div className="filtersCardSection">
                <div className="sectionTitle">Параметры</div>

                <div className="accordion">
                    {Object.entries(categories).map(([title, items]) => {
                        const isOpen = openCategory === title;
                        const panelId = `panel-${title.replace(/\s/g, "-")}`;

                        const value =
                            title === "Тип товара" ? selectedFilters.type :
                            title === "Бренд" ? selectedFilters.brand :
                            title === "Цена" ? selectedFilters.selectedPrice :
                            title === "Наличие"
                                            ? (selectedFilters.isInStock === null
                                                ? null
                                                : selectedFilters.isInStock ? "В наличии" : "Нет в наличии")
                                            : null;

                        return (
                            <div key={title} className={`accItem ${isOpen ? "open" : ""}`}>
                                <button
                                    type="button"
                                    className="accTrigger"
                                    onClick={() => toggle(title)}
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                >
                                    <span className="accTitle">{title}</span>
                                    {value ? <span className="accValue">{value}</span> : null}
                                    <span className="chevron" aria-hidden="true" />
                                </button>

                                <div
                                    id={panelId}
                                    className="accPanel"
                                    role="region"
                                    aria-label={title}
                                >
                                    {items.map((item) => {
                                        const checked = value === item;

                                        return (
                                            <label key={item} className={`option ${checked ? "checked" : ""}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => handleSingleSelect(title, item)}
                                                />
                                                <span>{item}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="filtersActions">
                <button type="button" className="btn secondary" onClick={resetFilters}>
                    Сбросить
                </button>
                <button type="button" className="btn primary" onClick={applyFilters}>
                    Применить
                </button>
            </div>
        </aside>
    );
}
