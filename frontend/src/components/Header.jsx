import React, { useState } from "react";
import CustomSelect from "./CustomSelect";

export default function Header() {
    const [city, setCity] = useState("Минск");

    return (
        <header>
            <div className="header-container">
                <div className="logo">🛍 Ctrl+Alt+Buy</div>

                <div className="search-box">
                    <input type="text" placeholder="Поиск товаров..." />
                    <button>🔍</button>
                </div>

                <div className="header-actions">
                    <CustomSelect
                        options={["Минск", "Могилев", "Гродно", "Брест", "Витебск", "Гомель"]}
                        value={city}
                        onChange={setCity}
                    />
                    <button className="auth-btn">Войти</button>
                    <button className="cart-btn">🛒 Корзина</button>
                </div>
            </div>
        </header>
    );
}
