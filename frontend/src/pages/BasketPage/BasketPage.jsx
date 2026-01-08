import React from "react";
import { Trash2 } from "lucide-react";
import BasketCard from "../../components/ui/BasketCard/BasketCard";
import { useBasket } from "../../hooks/useBasket";
import "./BasketPage.css";

export default function BasketPage() {
    const {
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
    } = useBasket();

    if (loading) return <div style={{ padding: 20 }}>Загрузка корзины...</div>;

    const isEmpty = items.length === 0;

    return (
        <div className="basket-page">
            <div className="basket-shell">
                <header className="basket-header">
                    <div className="basket-head-left">
                        <div className="basket-title-line">
                            <h1 className="basket-h1">Корзина</h1>
                            <span className="basket-badge">{items.length} шт.</span>
                            <span className={`basket-badge ${selectedCount ? "is-accent" : ""}`}>
                Выбрано: {selectedCount}
              </span>
                        </div>
                        <p className="basket-sub">
                            Нажмите на карточку, чтобы выбрать товар. Количество меняется кнопками +/−.
                        </p>
                    </div>

                    <div className="basket-toolbar">
                        <button className="basket-btn" onClick={selectAll} type="button" disabled={isEmpty}>
                            Выбрать все
                        </button>
                        <button className="basket-btn" onClick={clearSelection} type="button" disabled={selectedCount === 0}>
                            Снять выбор
                        </button>
                        <button
                            className="basket-btn danger"
                            type="button"
                            disabled={selectedCount === 0}
                            title="Удалить выбранные"
                            onClick={deleteSelected}
                        >
                            <Trash2 size={18} />
                            Удалить ({selectedCount})
                        </button>
                    </div>
                </header>

                {isEmpty ? (
                    <div className="basket-empty">
                        <div className="basket-empty-card">
                            <h2 className="basket-empty-title">Корзина пуста</h2>
                            <p className="basket-empty-sub">Добавьте товары на главной странице, чтобы они появились здесь.</p>
                            <a className="basket-empty-link" href="/">Перейти к товарам</a>
                        </div>
                    </div>
                ) : (
                    <div className="basket-grid">
                        <section className="basket-list">
                            {items.map((item) => (
                                <BasketCard
                                    key={item.id}
                                    item={item}
                                    selected={selectedIds.has(item.id)}
                                    onToggleSelect={toggleSelect}
                                    quantity={qtyById[item.id] || 1}
                                    onQuantityChange={onQuantityChange}
                                />
                            ))}
                        </section>

                        <aside className="basket-summary">
                            <div className="basket-summary-card">
                                <h2 className="basket-summary-title">Итого</h2>

                                <div className="basket-summary-row">
                                    <span className="basket-muted">Всего товаров</span>
                                    <span>{items.length}</span>
                                </div>
                                <div className="basket-summary-row">
                                    <span className="basket-muted">Сумма корзины</span>
                                    <span>{subtotal.toFixed(2)} BYN</span>
                                </div>
                                <div className="basket-summary-row">
                                    <span className="basket-muted">Выбрано</span>
                                    <span>{selectedSubtotal.toFixed(2)} BYN</span>
                                </div>

                                <div className="basket-summary-divider" />

                                <button className="basket-cta" type="button" disabled={items.length === 0}>
                                    Оформить заказ
                                </button>

                                <p className="basket-note">Итог без учёта доставки</p>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}
