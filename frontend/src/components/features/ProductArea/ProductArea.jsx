import React from "react";
import ProductCard from "../../ProductCard";
import Spinner from "../../ui/Spinner/Spinner";
import useProducts from "../../../hooks/useProducts";

export default function ProductArea({ filters }) {
    const { products, loading, error } = useProducts(filters);

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
