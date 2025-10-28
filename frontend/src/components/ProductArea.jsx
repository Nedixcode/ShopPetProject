import React, { useEffect, useState } from "react";
import "../styles/ProductArea.css";

export default function ProductArea() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке товаров:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Загрузка товаров...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div className="product-area">
            <h1 className="title">Наши товары</h1>
            <br></br>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        {product.imageUrl ? (
                            <img
                                src={products.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJGPFEmuQijp-gmaJHfxYY3opwx3R_1JafOA&s"}
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
                ))}
            </div>
        </div>
    );
}
