import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Filters from "../components/Filters";
import Ads from "../components/Ads";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";

    useEffect(() => {
        if (!query.trim()) return;

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
                <h1 className="page-title">
                    Результаты поиска по запросу: <span>“{query}”</span>
                </h1>
                <br />
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
            <Ads />
        </main>
    );
}
