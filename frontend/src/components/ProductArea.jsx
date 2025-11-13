import React, { useEffect, useState } from "react";
import "../styles/ProductArea.css";
import ProductCard from "../components/ProductCard";
import Spinner from "./Spinner";
import Filters from "./Filters";

export default function ProductArea() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAllProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/products/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: null,
                    type: null,
                    isInStock: null,
                    minPrice: null,
                    maxPrice: null,
                    sortBy: "id",
                    sortDirection: "asc",
                    page: 0,
                    size: 20,
                }),
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

    useEffect(() => {
        loadAllProducts();
    }, []);

    if (loading) return <Spinner text="Загрузка товаров..." />;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div className="product-area-wrapper">
            <div className="product-area">
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
