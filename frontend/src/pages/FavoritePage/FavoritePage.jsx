import React, { useEffect, useMemo, useState } from "react";
import { Trash2, Heart } from "lucide-react";
import { getFavorites } from "../../api/FavoritesApi";
import "./FavoritePage.css";

export default function FavoritePage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);

                const data = await getFavorites(); // ожидается List<ProductDto>
                if (!cancelled) setItems(Array.isArray(data) ? data : []);
            } catch (e) {
                if (!cancelled) setError(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    const total = useMemo(
        () => items.reduce((sum, p) => sum + Number(p.price || 0), 0),
        [items]
    );

    const handleRemove = (id) => {
        // Тут лучше дернуть API (DELETE /favorites/{id}) и потом обновить список.
        setItems((prev) => prev.filter((p) => p.id !== id));
    };

    if (loading) {
        return (
            <div className="fav-page">
                <div className="fav-hero">
                    <h1 className="fav-title">
                        <Heart size={22} /> Избранное
                    </h1>
                </div>
                <div className="fav-empty">
                    <div className="fav-empty__text">
                        <h2>Загрузка...</h2>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fav-page">
                <div className="fav-hero">
                    <h1 className="fav-title">
                        <Heart size={22} /> Избранное
                    </h1>
                </div>
                <div className="fav-empty">
                    <div className="fav-empty__text">
                        <h2>Ошибка загрузки</h2>
                        <p>{String(error?.message || error)}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fav-page">
            <div className="fav-hero">
                <div className="fav-hero__left">
                    <h1 className="fav-title">
                        <Heart size={22} /> Избранное
                    </h1>
                    <p className="fav-subtitle">
                        Здесь собраны товары, которые понравились — можно быстро сравнить и
                        удалить лишнее.
                    </p>
                </div>

                <div className="fav-hero__right">
                    <div className="fav-chip">
                        Товаров: <b>{items.length}</b>
                    </div>
                    <div className="fav-chip">
                        На сумму: <b>{total.toFixed(2)} BYN</b>
                    </div>
                </div>
            </div>

            {items.length === 0 ? (
                <div className="fav-empty">
                    <div className="fav-empty__icon">
                        <Heart size={26} />
                    </div>
                    <div className="fav-empty__text">
                        <h2>Пока пусто</h2>
                        <p>Добавь товары в избранное — и они появятся здесь.</p>
                    </div>
                </div>
            ) : (
                <div className="fav-grid">
                    {items.map((p) => (
                        <article className="fav-card" key={p.id}>
                            <div className="fav-card__imageWrap">
                                {p.imageUrl ? (
                                    <img className="fav-card__image" src={p.imageUrl} alt={p.name} />
                                ) : (
                                    <div className="fav-card__noImage">Нет изображения</div>
                                )}

                                <span className={`fav-badge ${p.inStock ? "ok" : "no"}`}>
                  {p.inStock ? "В наличии" : "Нет в наличии"}
                </span>
                            </div>

                            <div className="fav-card__body">
                                <div className="fav-card__top">
                                    <h3 className="fav-card__title">{p.name}</h3>
                                    <button
                                        type="button"
                                        className="fav-iconBtn"
                                        onClick={() => handleRemove(p.id)}
                                        aria-label="Удалить из избранного"
                                        title="Удалить"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <p className="fav-card__desc">{p.description}</p>

                                <div className="fav-meta">
                  <span className="fav-meta__item">
                    Бренд: <b>{p.brand}</b>
                  </span>
                                    <span className="fav-meta__item">
                    Город: <b>{p.city}</b>
                  </span>
                                </div>

                                <div className="fav-card__footer">
                                    <div className="fav-price">
                                        {Number(p.price).toFixed(2)}{" "}
                                        <span className="fav-currency">BYN</span>
                                    </div>
                                    <button
                                        type="button"
                                        className="fav-primaryBtn"
                                        disabled={!p.inStock}
                                        onClick={() => console.log("add to basket", p.id)}
                                    >
                                        В корзину
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
