import React, { useEffect, useState } from "react";
import "../styles/ProductArea.css";
import ProductCard from "../components/ProductCard";

export default function ProductArea() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/products")
            .then((response) => {
                if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
                return response.json();
            })
            .then((data) => setProducts(data))
            .catch((err) => {
                console.error("Ошибка при загрузке товаров:", err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading">Загрузка товаров...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div className="product-area">
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
