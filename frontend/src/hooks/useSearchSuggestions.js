import { useState, useEffect, useRef } from "react";

export default function useSearchSuggestions(query, delay = 300) {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch("/products/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query,
                        type: null,
                        isInStock: null,
                        minPrice: null,
                        maxPrice: null,
                        sortBy: "id",
                        sortDirection: "asc",
                        page: 0,
                        size: 100,
                    }),
                });

                if (!res.ok) throw new Error("Ошибка при поиске");
                const data = await res.json();
                const items = data.content || data;
                setSuggestions(items.slice(0, 5));
            } catch (err) {
                console.error(err);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, delay);

        return () => clearTimeout(timeoutRef.current);
    }, [query, delay]);

    return { suggestions, loading };
}
