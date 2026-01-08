import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../features/Search/SearchBar";
import CustomSelect from "../../ui/CustomSelect/CustomSelect";
import ProfileButton from "../../features/ProfileButton/ProfileButton";
import "../../features/SearchDropdown/SearchDropdown.css";
import { parseJwt, isTokenValid, isAdmin } from "../../../utils/auth";

export default function Header() {
    const [city, setCity] = useState("Минск");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleBasket = () => {
        if(!isTokenValid(token) || isAdmin(token)){
            alert("Корзина доступна только для пользователей");
            navigate('/');
            return;
        }
        console.log('Успешных вход');
        navigate('/user/basket');
    }
    return (
        <header>
            <div className="header-container">
                <div className="logo" onClick={() => navigate("/")}>
                    🛍 Ctrl+Alt+Buy
                </div>

                <SearchBar />

                <div className="header-actions">
                    <CustomSelect
                        options={["Минск", "Могилев", "Гродно", "Брест", "Витебск", "Гомель"]}
                        value={city}
                        onChange={setCity}
                    />
                    <ProfileButton />
                    <button className="cart-btn" onClick={handleBasket}>🛒 Корзина</button>
                </div>
            </div>
        </header>
    );
}
