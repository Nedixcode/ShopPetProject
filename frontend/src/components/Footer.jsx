import React from "react";

export default function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-logo">🛍 Ctrl+Alt+Buy</div>
                <div className="footer-info">
                    <p>Ctrl+Alt+Buy — это современный маркетплейс, где технологии встречаются с удобством.
                        Мы ежедневно работаем, чтобы покупки были проще и приятнее ❤️</p>
                </div>

                <div className="footer-copy">
                    © {new Date().getFullYear()} Ctrl+Alt+Buy. Все права защищены.
                </div>
            </div>
        </footer>
    );
}
