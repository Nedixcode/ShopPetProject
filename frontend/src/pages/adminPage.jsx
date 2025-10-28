import React, { useState, useEffect, useRef } from "react";
import "../styles/main.css";
import "../styles/ProductArea.css"
import { parseJwt, isTokenValid, isAdmin } from "../utils/auth";
import ProductCard from "../components/ProductCard";

export default function AdminPanel() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchTimeoutRef = useRef(null);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({
        isOpen: false,
        product: null,
    });
    const [form, setForm] = useState({
        name: "",
        description: "",
        type: "",
        price: "",
        isInStock: true,
    });



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!isTokenValid(token) || !isAdmin(token)) {
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
            return;
        }
        const payload = parseJwt(token);
        setUser(payload.sub);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("👋 Вы вышли из аккаунта");
        window.location.href = "/auth/login";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("⛔ Нет доступа. Пожалуйста, войдите заново.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/admin/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            if (res.status === 201) {
                alert("✅ Товар добавлен!");
                setForm({ name: "", description: "", type: "", price: "", isInStock: true });
                setIsModalOpen(false);
            } else if (res.status === 401) {
                alert("🚫 Сессия истекла. Войдите снова.");
                localStorage.removeItem("token");
                window.location.href = "/auth/login";
            } else {
                alert("❌ Ошибка при добавлении товара");
            }
        } catch (err) {
            console.error(err);
            alert("🚨 Ошибка соединения с сервером");
        } finally {
            setLoading(false);
        }
    };

    const loadProducts = async () => {
        setShowProducts(true);
        try {
            const res = await fetch("/products");
            if (!res.ok) throw new Error(`Ошибка ${res.status}`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Ошибка при загрузке товаров:", err);
            alert("❌ Не удалось загрузить товары");
        }
    };

    const confirmDelete = (product) => {
        setConfirmDeleteModal({ isOpen: true, product });
    };

    const handleDelete = async (productId) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`/admin/product/${productId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                alert("✅ Товар удалён!");
                setProducts((prev) => prev.filter((p) => p.id !== productId));
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

    const performSearch = async (query) => {
        try {
            if (!query.trim()) {
                // Если пустой запрос — загрузить все товары
                loadProducts();
                return;
            }

            const res = await fetch(`/products/search?query=${encodeURIComponent(query.trim())}`);
            if (!res.ok) throw new Error(`Ошибка ${res.status}`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Ошибка поиска:", err);
            setProducts([]);
        }
    };


    return (
        <div className="admin-layout">
            <header className="admin-header">
                <div className="admin-header-left">
                    <h1>Панель администратора</h1>
                    {user && <p className="admin-user">Администратор: {user}</p>}
                </div>
                <div className="admin-header-right">
                    <button className="admin-top-btn" onClick={() => (window.location.href = "/")}>
                        Главная
                    </button>
                    <button className="admin-top-btn">Настройки</button>
                    <button className="admin-top-btn logout" onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            </header>

            <div className="admin-main">
                <aside className="admin-sidebar">
                    <h2>Меню</h2>
                    <button
                        className="sidebar-btn primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        ➕ Добавить товар
                    </button>
                    <button className="sidebar-btn" onClick={loadProducts}>
                        📦 Все товары
                    </button>
                    <button className="sidebar-btn">🧾 Заказы</button>
                </aside>

                <section className="admin-content">
                    {showProducts ? (
                        <>
                            <input
                                type="text"
                                className="admin-search-input"
                                placeholder="Поиск товаров..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
                                    searchTimeoutRef.current = setTimeout(() => {
                                        performSearch(e.target.value);
                                    }, 300);
                                }}
                            />

                            <div className="product-grid">
                                {products.length === 0 ? (
                                    <p>Товары не найдены</p>
                                ) : (
                                    products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            isAdmin={true}
                                            onEdit={() => handleEdit(product)}
                                            onDelete={() => confirmDelete(product)}
                                        />
                                    ))
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>Добро пожаловать 👋</h2>
                            <p>Выберите действие в меню слева.</p>
                        </>
                    )}
                </section>
            </div>

            {confirmDeleteModal.isOpen && confirmDeleteModal.product && (
                <div
                    className="admin-modal-overlay"
                    onClick={() => setConfirmDeleteModal({ isOpen: false, product: null })}
                >
                    <div
                        className="admin-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Подтверждение удаления</h2>
                        <p>Вы действительно хотите удалить товар "<strong>{confirmDeleteModal.product.name}</strong>"?</p>
                        <div className="admin-modal-buttons">
                            <button
                                className="admin-delete-btn"
                                onClick={() => handleDelete(confirmDeleteModal.product.id)}
                            >
                                ✅ Да, удалить
                            </button>
                            <button
                                className="admin-cancel-btn"
                                onClick={() => setConfirmDeleteModal({ isOpen: false, product: null })}
                            >
                                ❌ Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div
                    className="admin-modal-overlay"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="admin-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="admin-close-btn"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✖
                        </button>
                        <h2 className="admin-modal-title">Добавить товар</h2>
                        <form className="admin-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Название"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Описание"
                                value={form.description}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="type"
                                placeholder="Тип"
                                value={form.type}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Цена (BYN)"
                                value={form.price}
                                onChange={handleChange}
                                required
                            />
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="isInStock"
                                    checked={form.isInStock}
                                    onChange={handleChange}
                                />
                                Есть в наличии
                            </label>
                            <button
                                type="submit"
                                className={`admin-save-btn ${loading ? "loading" : ""}`}
                                disabled={loading}
                            >
                                {loading ? "⏳ Сохраняем..." : "✅ Сохранить"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
