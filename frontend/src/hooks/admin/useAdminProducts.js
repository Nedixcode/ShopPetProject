import { useCallback, useState } from "react";

export default function useAdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadProducts = useCallback(async () => {
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
                    size: 100,
                }),
            });

            if (!res.ok) throw new Error(`Ошибка ${res.status}`);
            const data = await res.json();
            setProducts(data.content || []);
            return data.content || [];
        } finally {
            setLoading(false);
        }
    }, []);

    const searchProducts = useCallback(async (query) => {
        setLoading(true);
        try {
            const res = await fetch("/products/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: query?.trim() ? query.trim() : null,
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

            if (!res.ok) throw new Error(`Ошибка ${res.status}`);
            const data = await res.json();
            setProducts(data.content || []);
            return data.content || [];
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteProduct = useCallback(async (productId) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`/admin/product/${productId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
            setProducts((prev) => prev.filter((p) => p.id !== productId));
            return true;
        }
        return false;
    }, []);

    return {
        products,
        setProducts,
        loading,
        loadProducts,
        searchProducts,
        deleteProduct,
    };
}
