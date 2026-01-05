import React, { useEffect, useRef } from "react";
import "./ModalDelete.css";

export default function ConfirmDeleteModal({
                                               isOpen,
                                               product,
                                               loading = false,
                                               onCancel,
                                               onConfirm,
                                           }) {
    const confirmDeleteBtnRef = useRef(null);
    useEffect(() => {
        if (isOpen) setTimeout(() => confirmDeleteBtnRef.current?.focus(), 0);
    }, [isOpen]);

    if (!isOpen) return null;

    const dialogTitleId = "confirm-delete-title";
    const dialogDescId = "confirm-delete-desc";

    return (
        <div className="modal-backdrop" onClick={onCancel}>
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={dialogTitleId}
                aria-describedby={dialogDescId}
            >
                <h3 id={dialogTitleId}>Подтвердите удаление</h3>

                <p id={dialogDescId}>
                    Удалить товар: <b>{product?.name ?? `#${product?.id}`}</b>?
                </p>

                <div className="modal-actions">
                    <button className="admin-top-btn" onClick={onCancel} disabled={loading}>
                        Отмена
                    </button>

                    <button
                        ref={confirmDeleteBtnRef}
                        className="admin-top-btn logout"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
}
