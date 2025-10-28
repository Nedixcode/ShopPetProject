import React from "react";

export default function ProductCard({ product }) {
    return (
        <div key={product.id} className="product-card">
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
                    <button className="product-button">В корзину</button>
                </div>
            </div>
        </div>
    );
}
