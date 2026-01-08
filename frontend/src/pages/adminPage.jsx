import React, { useState, useEffect, useRef } from "react";
import { parseJwt, isTokenValid, isAdmin } from "../utils/auth";
import "../styles/Admin.css";
import "../components/features/ProductArea/ProductArea.css";
import ProductCard from "../components/ProductCard";
import ProfileButton from "../components/features/ProfileButton/ProfileButton";
import Spinner from "../components/ui/Spinner/Spinner";
import ConfirmDeleteModal from "../components/modals/DeleteModal/ConfirmDeleteModal";
import ProductModal from "../components/modals/ProductModal/ProductModal";

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
    const [editModal, setEditModal] = useState({ isOpen: false, product: null });
    const openEdit = (product) => setEditModal({ isOpen: true, product });

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
        const payload = parseJwt(token);
        setUser(payload.sub);
        loadProducts();
    }, []);

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

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-brand">Панель администратора</div>
                <nav className="admin-nav">
                    <button className="admin-nav-item is-active">Товары</button>
                    <button className="admin-nav-item">Заказы</button>
                    <button className="admin-nav-item">Клиенты</button>
                    <button className="admin-nav-item">Фильтры</button>
                    <button className="admin-nav-item">Настройки</button>
                </nav>

                <div className="admin-sidebar-footer">
                    <button className="admin-nav-item logout" onClick={handleLogout}>Выйти</button>
                </div>
            </aside>

            <main className="admin-main">
                {/* Верхняя панель контента */}
                <div className="admin-topbar">
                    <input
                        type="text"
                        className="admin-search-input"
                        placeholder="Поиск товаров..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    <div className="admin-topbar-actions">
                        <ProfileButton /> {/* это и будет “переход в ЛК” */}
                    </div>
                </div>

                {/* Большой блок товаров */}
                <section className="admin-content">
                    <div className="admin-content-head">
                        <h2>Товары</h2>
                        <button className="admin-top-btn primary" onClick={() => setIsModalOpen(true)}>
                            + Добавить товар
                        </button>
                    </div>

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
                                    onEdit={() => setEditModal({ isOpen: true, product })}
                                    onDelete={() => openDeleteConfirm(product)}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <ConfirmDeleteModal
                isOpen={confirmDeleteModal.isOpen}
                product={confirmDeleteModal.product}
                loading={loading}
                onCancel={closeDeleteConfirm}
                onConfirm={confirmDelete}
            />
            <ProductModal
                isOpen={isModalOpen}
                mode="create"
                loading={loading}
                onClose={() => setIsModalOpen(false)}
                onCreated={(createdProduct) => setProducts((prev) => [createdProduct, ...prev])}
            />
            <ProductModal
                isOpen={editModal.isOpen}
                mode="edit"
                product={editModal.product}
                onClose={() => setEditModal({ isOpen: false, product: null })}
                onUpdated={(updated) =>
                    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
                }
            />
        </div>
    );
}
