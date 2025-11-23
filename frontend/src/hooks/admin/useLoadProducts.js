import { useState, useEffect } from "react";

export default function useLoadProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/products");
            if (!res.ok) throw new Error(`Ошибка ${res.status}`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Ошибка при загрузке товаров:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return { products, loading, error, loadProducts, setProducts };
}
