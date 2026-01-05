import React, { useEffect, useMemo, useState } from "react";
import "../DeleteModal/ModalDelete.css";
import "./AddProductModal.css";
import CloseButton from "../../ui/CloseButton/CloseButton";

const EMPTY = {
    name: "",
    description: "",
    price: "",
    type: "",
    inStock: true,
};

export default function AddProductModal({
                                            isOpen,
                                            loading = false,
                                            onClose,
                                            onCreated, // (createdProduct) => void
                                        }) {
    const [form, setForm] = useState(EMPTY);
    const [imageFile, setImageFile] = useState(null);

    // preview
    const previewUrl = useMemo(() => {
        if (!imageFile) return null;
        return URL.createObjectURL(imageFile);
    }, [imageFile]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    useEffect(() => {
        if (isOpen) {
            setForm(EMPTY);
            setImageFile(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const setField = (key) => (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const removeImage = () => setImageFile(null);

    const submit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) return alert("Введите название товара");
        if (!form.price || Number.isNaN(Number(form.price))) return alert("Введите цену");

        const token = localStorage.getItem("token");

        const productDto = {
            name: form.name.trim(),
            description: form.description?.trim() || null,
            price: Number(form.price),
            type: form.type?.trim() || null,
            isInStock: !!form.inStock,
        };

        const fd = new FormData();
        fd.append("product", JSON.stringify(productDto));
        if (imageFile) fd.append("image", imageFile);

        const res = await fetch("admin/product", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: fd,
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`Ошибка ${res.status}. ${text}`);
        }

        const created = await res.json();
        onCreated?.(created);
        onClose?.();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                <h3>Добавить товар</h3>

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
                        <input type="checkbox" checked={form.inStock} onChange={setField("inStock")} />
                        <span>В наличии</span>
                    </label>

                    <label className="field">
                        <span>Фото (необязательно)</span>
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
                                <button type="button" className="link-btn" onClick={removeImage}>
                                    Убрать фото
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="modal-actions">
                        <button type="button" className="admin-top-btn" onClick={onClose} disabled={loading}>
                            Отмена
                        </button>
                        <button type="submit" className="admin-top-btn" disabled={loading}>
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
