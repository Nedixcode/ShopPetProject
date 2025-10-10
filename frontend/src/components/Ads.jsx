import React from "react";

export default function Ads() {
    return (
        <aside className="sidebar-right ads">
            <h2>Акции и предложения</h2>
            <div className="promo">
                <h3>🔥 Скидка -20%</h3>
                <p>На все аксессуары Apple до 10 октября!</p>
            </div>
            <div className="promo">
                <h3>🎮 Игровая неделя</h3>
                <p>Купи консоль — получи игру в подарок!</p>
            </div>
            <div className="promo">
                <h3>🚚 Бесплатная доставка</h3>
                <p>При заказе от 300 BYN по всей Беларуси.</p>
            </div>
        </aside>
    );
}
