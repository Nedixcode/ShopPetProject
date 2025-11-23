import { useState, useEffect, useRef } from "react";

export default function useProducts(filters, delay = 300) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!filters) return;

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
            setLoading(true);
            setError(null);

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
        }, delay);

        return () => clearTimeout(timeoutRef.current);
    }, [filters, delay]);

    return { products, loading, error };
}
