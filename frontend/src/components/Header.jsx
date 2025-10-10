import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import LoginModal from "./LoginModal";

export default function Header() {
    const [city, setCity] = useState("Минск");
    const [showLogin, setShowLogin] = useState(false);

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
                    <button className="auth-btn" onClick={() => setShowLogin(true)}>
                        Войти
                    </button>
                    <button className="cart-btn">🛒 Корзина</button>
                </div>
            </div>

            <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
        </header>
    );
}
