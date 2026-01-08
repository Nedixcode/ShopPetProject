import { useEffect, useMemo, useState } from "react";
import { isTokenValid } from "../utils/auth";
import { getBasketProducts, deleteProductsFromBasket } from "../api/BasketApi";
import { mapBasketResponseToUi } from "../utils/basketMapper";

export function useBasket() {
    const [items, setItems] = useState([]);
    const [qtyById, setQtyById] = useState({});
    const [selectedIds, setSelectedIds] = useState(() => new Set());
    const [loading, setLoading] = useState(true);

    const selectedCount = selectedIds.size;

    const subtotal = useMemo(
        () => items.reduce((sum, it) => sum + it.price * (qtyById[it.id] || 1), 0),
        [items, qtyById]
    );

    const selectedSubtotal = useMemo(
        () =>
            items.reduce((sum, it) => {
                if (!selectedIds.has(it.id)) return sum;
                return sum + it.price * (qtyById[it.id] || 1);
            }, 0),
        [items, qtyById, selectedIds]
    );

    const toggleSelect = (id) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const selectAll = () => setSelectedIds(new Set(items.map((i) => i.id)));
    const clearSelection = () => setSelectedIds(new Set());

    const onQuantityChange = (id, value) => {
        const n = Math.max(1, Number(value || 1));
        setQtyById((prev) => ({ ...prev, [id]: n }));
    };

    const loadBasket = async () => {
        const token = localStorage.getItem("token");

        if (!isTokenValid(token)) {
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
            return;
        }

        setLoading(true);
        try {
            const res = await getBasketProducts(token);

            if (res.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/auth/login";
                return;
            }

            if (!res.ok) {
                alert("Не удалось загрузить корзину");
                setItems([]);
                setQtyById({});
                setSelectedIds(new Set());
                return;
            }

            const data = await res.json();
            const mapped = mapBasketResponseToUi(data);

            setItems(mapped.items);
            setQtyById(mapped.qtyById);
            setSelectedIds(new Set());
        } finally {
            setLoading(false);
        }
    };

    const deleteSelected = async () => {
        const token = localStorage.getItem("token");
        const ids = Array.from(selectedIds);
        if (ids.length === 0) return;

        const res = await deleteProductsFromBasket(ids, token);

        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
            return;
        }

        if (!res.ok) {
            alert("Не удалось удалить товары");
            return;
        }
        await loadBasket();
    };

    useEffect(() => {
        loadBasket();
    }, []);

    return {
        items,
        qtyById,
        selectedIds,
        loading,
        selectedCount,
        subtotal,
        selectedSubtotal,
        toggleSelect,
        selectAll,
        clearSelection,
        onQuantityChange,
        deleteSelected,
        reload: loadBasket,
    };
}
