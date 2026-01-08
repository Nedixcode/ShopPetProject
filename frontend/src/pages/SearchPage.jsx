import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Filters from "../components/features/Filters/Filters";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = new URLSearchParams(location.search);
    const query = location.state?.query || null;

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch("/products/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: query,
                type: null,
                isInStock: null,
                minPrice: null,
                maxPrice: null,
                sortBy: "id",
                sortDirection: "asc",
                page: 0,
                size: 100
            })
        })
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка при поиске товаров");
                return res.json();
            })
            .then((data) => {
                setProducts(data.content || data);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [query]);


    return (
        <main className="main-layout">
            <Filters />
            <div className="product-area">
                {loading && <div className="loading">Загрузка...</div>}
                {error && <div className="error">{error}</div>}

                {!loading && !error && (
                    <>
                        {products.length === 0 ? (
                            <div className="no-results">Ничего не найдено</div>
                        ) : (
                            <div className="product-grid">
                                {products.map((product) => (
                                    <ProductCard product={product} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
