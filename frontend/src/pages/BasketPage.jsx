import { useState, useEffect } from 'react';
import { parseJwt, isTokenValid, isAdmin } from "../utils/auth";

export default function BasketPage () {
    const token = localStorage.getItem("token");
        return (
        <div>
            <span>Корзина</span>
        </div>
    )
}