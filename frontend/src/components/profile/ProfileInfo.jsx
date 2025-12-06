import React from "react";

export default function ProfileInfo({ user }) {
    return (
        <div className="profile-info">
            <p>
                <strong>Имя пользователя:</strong> {user.username}
            </p>
            <p>
                <strong>Статус:</strong> {user.status || "Пользователь"}
            </p>
            <p>
                <strong>Дата регистрации:</strong> {user.registeredAt}
            </p>
            <p>
                <strong>Последний вход:</strong> {user.lastLogin}
            </p>
        </div>
    );
}
