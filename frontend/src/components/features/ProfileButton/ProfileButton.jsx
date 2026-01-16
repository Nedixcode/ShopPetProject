import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, LogIn } from "lucide-react"; // [web:72][web:73]
import { parseJwt, isTokenValid } from "../../../utils/auth";
import "../../layout/Header/Header.css";

export default function ProfileButton() {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token && isTokenValid(token)) {
            const payload = parseJwt(token);
            setUsername(payload?.sub || null);
        } else {
            setUsername(null);
        }

        setLoading(false);
    }, []);

    if (loading) {
        return <div className="spinner" title="Проверка входа..." />;
    }

    return username ? (
        <Link to="/profile" className="auth-btn" title="Профиль">
            <User size={18} />
            <span>{username}</span>
        </Link>
    ) : (
        <Link to="/auth/login" className="auth-btn" title="Войти">
            <LogIn size={18} />
            <span>Войти</span>
        </Link>
    );
}
