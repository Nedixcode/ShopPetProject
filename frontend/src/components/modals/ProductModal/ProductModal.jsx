import React, { useEffect, useMemo, useState } from "react";
import "./ProductModal.css"
import CloseButton from "../../ui/CloseButton/CloseButton";

const EMPTY = {
    name: "",
    description: "",
    price: "",
    type: "",
    inStock: true,
};

export default function ProductModal({
                                         isOpen,
                                         mode = "create",          // "create" | "edit"
                                         product = null,           // обязателен для mode="edit"
                                         loading = false,
                                         onClose,
                                         onCreated,                // (createdProduct) => void
                                         onUpdated,                // (updatedProduct) => void
                                     }) {
    const [form, setForm] = useState(EMPTY);
    const [imageFile, setImageFile] = useState(null);
    const [saving, setSaving] = useState(false);

    const previewUrl = useMemo(() => {
        if (!imageFile) return null;
        return URL.createObjectURL(imageFile);
    }, [imageFile]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // Инициализация формы при открытии / смене режима / смене товара
    useEffect(() => {
        if (!isOpen) return;

        if (mode === "edit") {
            if (!product) {
                setForm(EMPTY);
                setImageFile(null);
                return;
            }

            setForm({
                name: product.name ?? "",
                description: product.description ?? "",
                price: product.price ?? "",
                type: product.type ?? "",
                inStock: product.isInStock ?? product.inStock ?? true,
            });
            setImageFile(null);
        } else {
            setForm(EMPTY);
            setImageFile(null);
        }
    }, [isOpen, mode, product]);

    if (!isOpen) return null;

    const disabled = loading || saving;

    const setField = (key) => (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const removeImage = () => setImageFile(null);

    const submit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) return alert("Введите название товара");
        if (form.price === "" || Number.isNaN(Number(form.price))) return alert("Введите цену");

        if (mode === "edit" && !product?.id) {
            return alert("Не выбран товар для редактирования");
        }

        const token = localStorage.getItem("token");

        const productDto = {
            name: form.name.trim(),
            description: form.description?.trim() || null,
            price: Number(form.price),
            type: form.type?.trim() || null,
            isInStock: !!form.inStock,
        };

        const fd = new FormData();
        // Важно для @RequestPart("product") ProductDto: JSON как application/json Blob [web:722]
        fd.append("product", new Blob([JSON.stringify(productDto)], { type: "application/json" }));
        if (imageFile) fd.append("image", imageFile);

        const url =
            mode === "edit" ? `/admin/product/${product.id}` : "/admin/product";

        const method = mode === "edit" ? "PUT" : "POST";

        setSaving(true);
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: fd,
            });

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`Ошибка ${res.status}. ${text}`);
            }

            const saved = await res.json();

            if (mode === "edit") onUpdated?.(saved);
            else onCreated?.(saved);

            onClose?.();
        } catch (err) {
            console.error(err);
            alert(mode === "edit" ? "❌ Не удалось обновить товар" : "❌ Не удалось добавить товар");
        } finally {
            setSaving(false);
        }
    };

    const title = mode === "edit" ? "Редактировать товар" : "Добавить товар";
    const submitText = saving
        ? (mode === "edit" ? "Сохранение..." : "Добавление...")
        : (mode === "edit" ? "Сохранить" : "Добавить");

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                <CloseButton to={"/"} />
                <h3>{title}</h3>

                <form className="add-product-form" onSubmit={submit}>
                    <label className="field">
                        <span>Название</span>
                        <input
                            type="text"
                            value={form.name}
                            onChange={setField("name")}
                            placeholder="Например: Клавиатура KeyMaster"
                            required
                        />
                    </label>

                    <label className="field">
                        <span>Описание</span>
                        <textarea
                            value={form.description}
                            onChange={setField("description")}
                            placeholder="Короткое описание"
                            rows={3}
                        />
                    </label>

                    <div className="row2">
                        <label className="field">
                            <span>Цена</span>
                            <input
                                type="number"
                                value={form.price}
                                onChange={setField("price")}
                                min="0"
                                step="0.01"
                                required
                            />
                        </label>

                        <label className="field">
                            <span>Тип</span>
                            <input
                                type="text"
                                value={form.type}
                                onChange={setField("type")}
                                placeholder="Например: Electronics"
                            />
                        </label>
                    </div>

                    <label className="field inline">
                        <input
                            type="checkbox"
                            checked={form.inStock}
                            onChange={setField("inStock")}
                        />
                        <span>В наличии</span>
                    </label>

                    <label className="field">
                        <span>{mode === "edit" ? "Новое фото (необязательно)" : "Фото (необязательно)"}</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        />
                    </label>

                    {imageFile && (
                        <div className="image-box">
                            {previewUrl ? <img src={previewUrl} alt="Preview" /> : null}
                            <div className="image-meta">
                                <div className="image-name" title={imageFile.name}>{imageFile.name}</div>
                                <button type="button" className="link-btn" onClick={removeImage} disabled={disabled}>
                                    Убрать фото
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="modal-actions">
                        <button type="button" className="admin-top-btn" onClick={onClose} disabled={disabled}>
                            Отмена
                        </button>
                        <button type="submit" className="admin-top-btn" disabled={disabled}>
                            {submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
