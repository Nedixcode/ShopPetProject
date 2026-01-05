import React, { useState, useEffect, useRef } from "react";
import "../styles/main.css";
import "../components/features/ProductArea/ProductArea.css";
import { parseJwt, isTokenValid, isAdmin } from "../utils/auth";
import ProductCard from "../components/ProductCard";
import ProfileButton from "../components/features/ProfileButton/ProfileButton";
import Spinner from "../components/ui/Spinner/Spinner";
import "../components/modals/DeleteModal/ModalDelete.css"
import ConfirmDeleteModal from "../components/modals/DeleteModal/ConfirmDeleteModal";
import AddProductModal from "../components/modals/AddProductModal/AddProductModal";

export default function AdminPanel() {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({
        isOpen: false,
        product: null,
    });

    const searchTimeoutRef = useRef(null);
    const confirmDeleteBtnRef = useRef(null);

    const openDeleteConfirm = (product) => {
        setConfirmDeleteModal({ isOpen: true, product });
    };

    const closeDeleteConfirm = () => {
        setConfirmDeleteModal({ isOpen: false, product: null });
    };

    const confirmDelete = async () => {
        if (!confirmDeleteModal.product) return;
        await handleDelete(confirmDeleteModal.product.id);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!isTokenValid(token) || !isAdmin(token)) {
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
            return;
        }
        const payload = parseJwt(token);
        setUser(payload.sub);
        loadProducts();
    }, []);

    // Фокус на кнопку "Удалить" при открытии
    useEffect(() => {
        if (confirmDeleteModal.isOpen) {
            setTimeout(() => confirmDeleteBtnRef.current?.focus(), 0);
        }
    }, [confirmDeleteModal.isOpen]);

    const loadProducts = async () => {
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
        } catch (err) {
            console.error("Ошибка при загрузке товаров:", err);
            setProducts([]);
            alert("❌ Не удалось загрузить товары");
        } finally {
            setLoading(false);
        }
    };

    const performSearch = async (query) => {
        setLoading(true);
        try {
            const res = await fetch("/products/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: query.trim() || null,
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
        } catch (err) {
            console.error("Ошибка поиска:", err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(() => performSearch(value), 150);
    };

    const handleDelete = async (productId) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`/admin/product/${productId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                setProducts((prev) => prev.filter((p) => p.id !== productId));
                alert("✅ Товар удалён!");
            } else {
                alert("❌ Ошибка при удалении");
            }
        } catch (err) {
            console.error(err);
            alert("🚨 Ошибка соединения с сервером");
        } finally {
            setConfirmDeleteModal({ isOpen: false, product: null });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("👋 Вы вышли из аккаунта");
        window.location.href = "/auth/login";
    };

    const dialogTitleId = "confirm-delete-title";
    const dialogDescId = "confirm-delete-desc";

    return (
        <div className="admin-layout">
            <header className="admin-header">
                <div className="admin-header-left">
                    <h1>Панель администратора</h1>
                </div>
                <div className="admin-header-right">
                    <ProfileButton />
                    <button className="admin-top-btn">Настройки</button>
                    <button className="admin-top-btn logout" onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            </header>

            <div className="admin-main">
                <aside className="admin-sidebar">
                    <h2>Меню</h2>
                    <button className="sidebar-btn primary" onClick={() => setIsModalOpen(true)}>
                        ➕ Добавить товар
                    </button>
                    <button className="sidebar-btn">🧾 Заказы</button>
                </aside>

                <section className="admin-content">
                    <input
                        type="text"
                        className="admin-search-input"
                        placeholder="Поиск товаров..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    {loading ? (
                        <Spinner text="Загрузка товаров..." />
                    ) : products.length === 0 ? (
                        <p>Товары не найдены</p>
                    ) : (
                        <div className="product-grid">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isAdmin={true}
                                    onEdit={() => console.log("Редактировать", product)}
                                    onDelete={() => openDeleteConfirm(product)}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
            <ConfirmDeleteModal
                isOpen={confirmDeleteModal.isOpen}
                product={confirmDeleteModal.product}
                loading={loading}
                onCancel={closeDeleteConfirm}
                onConfirm={confirmDelete}
            />
            <AddProductModal
                isOpen={isModalOpen}
                loading={loading}
                onClose={() => setIsModalOpen(false)}
                onCreated={(createdProduct) => {
                    setProducts((prev) => [createdProduct, ...prev]);
                }}
            />
        </div>
    );
}
