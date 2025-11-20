import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Spinner from "./Spinner";

export default function ProductArea({ filters }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/products/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filters),
            });

            if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
            const data = await res.json();

            setProducts(data.content || data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // вызывается при первом рендере и при ИЗМЕНЕНИИ фильтров
    useEffect(() => {
        fetchProducts();
    }, [filters]);

    if (loading) return <Spinner text="Загрузка товаров..." />;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div className="product-area">
            <div className="product-grid">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
}
