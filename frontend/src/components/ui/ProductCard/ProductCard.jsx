import React, { useState } from "react";
import { Pencil, Trash2, Heart } from "lucide-react";
import "./ProductCard.css"

export default function ProductCard({
                                        product,
                                        isAdmin = false,
                                        onEdit,
                                        onDelete,
                                        onAddToBasket,
                                        isFavorite = false,
                                        onToggleFavorite,
                                    }) {
    const [adding, setAdding] = useState(false);

    const handleAdd = async () => {
        if (!onAddToBasket) return;
        try {
            setAdding(true);
            await onAddToBasket(product.id);
        } finally {
            setAdding(false);
        }
    };

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite?.(product.id);
    };

    return (
        <div className="product-card">
            {!isAdmin && (
                <button
                    type="button"
                    className={`favorite-btn ${isFavorite ? "active" : ""}`}
                    onClick={handleToggleFavorite}
                    aria-label={isFavorite ? "Убрать из избранного" : "В избранное"}
                    title={isFavorite ? "Убрать из избранного" : "В избранное"}
                >
                    <Heart
                        size={18}
                        className="favorite-icon"
                        fill={isFavorite ? "currentColor" : "none"}
                    />
                </button>
            )}

            {product.imageUrl ? (
                <img
                    src={
                        product.imageUrl ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJGPFEmuQijp-gmaJHfxYY3opwx3R_1JafOA&s"
                    }
                    alt={product.name}
                    className="product-image"
                />
            ) : (
                <div className="no-image">Нет изображения</div>
            )}

            <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                    <span className="product-price">{product.price} BYN</span>

                    {isAdmin ? (
                        <div className="admin-buttons">
                            <button
                                className="icon-button edit"
                                onClick={() => onEdit?.(product)}
                                title="Редактировать"
                            >
                                <Pencil size={16} />
                            </button>
                            <button
                                className="icon-button delete"
                                onClick={() => onDelete?.(product)}
                                title="Удалить"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="product-button"
                            onClick={handleAdd}
                            disabled={adding}
                        >
                            В корзину
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
