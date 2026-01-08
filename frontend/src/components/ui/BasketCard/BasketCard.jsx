import React from "react";
import "./BasketCard.css";

export default function BasketCard({
                                       item,
                                       selected,
                                       onToggleSelect,
                                       quantity,
                                       onQuantityChange,
                                   }) {
    const dec = (e) => {
        e.stopPropagation();
        onQuantityChange(item.id, Math.max(1, Number(quantity) - 1));
    };

    const inc = (e) => {
        e.stopPropagation();
        onQuantityChange(item.id, Number(quantity) + 1);
    };

    const toggle = () => onToggleSelect(item.id);

    return (
        <article
            className={`basket-card ${selected ? "is-selected" : ""}`}
            role="button"
            tabIndex={0}
            onClick={toggle}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle();
                }
            }}
        >
            <label className="basket-check" onClick={(e) => e.stopPropagation()}>
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onToggleSelect(item.id)}
                />
                <span className="basket-check-ui" aria-hidden="true" />
            </label>

            <div className="basket-media" aria-hidden="true">
                <img src={item.imageUrl} alt={item.name} loading="lazy" />
            </div>

            <div className="basket-main">
                <div className="basket-title-row">
                    <h3 className="basket-title">{item.name}</h3>
                    <div className="basket-price">{Number(item.price).toFixed(2)} BYN</div>
                </div>

                <p className="basket-desc">{item.description}</p>

                <div className="basket-controls">
                    <div className="basket-qty">
                        <span className="basket-qty-label">Количество</span>

                        <div className="basket-stepper" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="basket-stepper-btn"
                                type="button"
                                onClick={dec}
                                disabled={Number(quantity) <= 1}
                                aria-label="Уменьшить количество"
                            >
                                −
                            </button>

                            <div className="basket-stepper-value" aria-label={`Количество: ${quantity}`}>
                                {quantity}
                            </div>

                            <button
                                className="basket-stepper-btn"
                                type="button"
                                onClick={inc}
                                aria-label="Увеличить количество"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="basket-line-total">
                        <span className="basket-muted">Сумма</span>
                        <span className="basket-line-total-value">
              {(Number(item.price) * Number(quantity)).toFixed(2)} BYN
            </span>
                    </div>
                </div>
            </div>
        </article>
    );
}
