import React from "react";

export default function ProfileAvatar({ src, onChange }) {
    return (
        <div className="profile-avatar-wrapper">
            <img
                src={src}
                alt="Аватар"
                className="profile-avatar"
            />
            <label className="profile-avatar-upload">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    style={{ display: "none" }}
                />
                <span>📷 Изменить фото</span>
            </label>
        </div>
    );
}
