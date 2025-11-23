import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { parseJwt, isTokenValid } from "../../../utils/auth";
import "../../../styles/Header.css";

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

    return (
        <>
            {username ? (
                <Link to="/profile" className="auth-btn">
                    {username}
                </Link>
            ) : (
                <Link to="/auth/login" className="auth-btn">
                    Войти
                </Link>
            )}
        </>
    );
}
