import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt, isTokenValid } from "../utils/auth";
import CloseButton from "../components/CloseButton";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && isTokenValid(token)) {
            const payload = parseJwt(token);
            setUser({
                username: payload?.sub,
                roles: payload?.roles?.map(r => r.authority).join(", "),
                issuedAt: new Date(payload.iat * 1000).toLocaleString(),
                expiresAt: new Date(payload.exp * 1000).toLocaleString(),
                avatar: null // можно поставить дефолтное фото
            });
        } else {
            navigate("/auth/login");
        }
        setLoading(false);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("👋 Вы вышли из аккаунта");
        window.location.reload();
    };

    if (loading || !user) {
        return (
            <div className="profile-page">
                <div className="profile-card loading">
                    <p>Загрузка...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                <CloseButton to={"/"}/>
                <h1>👤 Профиль пользователя</h1>
                <div className="profile-info">
                    <p><strong>Логин:</strong> {user.username}</p>
                    <p><strong>Роли:</strong> {user.roles}</p>
                    <p><strong>Вход выполнен:</strong> {user.issuedAt}</p>
                    <p><strong>Токен истекает:</strong> {user.expiresAt}</p>
                </div>
                <div className="profile-actions">
                    <button className="modal-btn primary" onClick={handleLogout}>
                        🚪 Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );
}
