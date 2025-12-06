// ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt, isTokenValid } from "../../utils/auth";
import CloseButton from "../../components/ui/CloseButton/CloseButton";
import ProfileAvatar from "../../components/profile/ProfileAvatar"
import ProfileInfo from "../../components/profile/ProfileInfo";
import "./ProfilePage.css";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState(null);    // URL или base64
    const [preview, setPreview] = useState(null);  // локальное превью
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token && isTokenValid(token)) {
            const payload = parseJwt(token);
            setUser({
                username: payload?.sub || "Пользователь",
                status: "Пользователь",
                registeredAt: "01.01.2025",
                lastLogin: "сегодня",
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

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Пожалуйста, выберите изображение (JPG, PNG и т.д.)");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
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
                <CloseButton to="/" />
                <h1>👤 Профиль пользователя</h1>

                <div className="profile-content">
                    <ProfileAvatar
                        src={preview || avatar || "/images/avatar-placeholder.png"}
                        onChange={handleAvatarChange}
                    />

                    <ProfileInfo user={user} />
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
