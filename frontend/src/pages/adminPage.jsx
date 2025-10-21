import React, { useState, useEffect } from "react";
import "../styles/main.css";
import { parseJwt, isTokenValid, isAdmin } from "../utils/auth";

export default function AdminPanel() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        type: "",
        price: "",
        isInStock: true,
    });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    // 🔒 Проверка токена при загрузке страницы
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

    return (
        <div className="admin-layout">
            {/* ===== Верхняя шапка ===== */}
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

            {/* ===== Основной контент ===== */}
            <div className="admin-main">
                {/* Sidebar */}
                <aside className="admin-sidebar">
                    <h2>Меню</h2>
                    <button
                        className="sidebar-btn primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        ➕ Добавить товар
                    </button>
                    <button className="sidebar-btn">📦 Все товары</button>
                    <button className="sidebar-btn">🧾 Заказы</button>
                </aside>

                {/* Контент */}
                <section className="admin-content">
                    <h2>Добро пожаловать 👋</h2>
                    <p>Выберите действие в меню слева.</p>
                </section>
            </div>

            {/* ===== Модалка добавления товара ===== */}
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
