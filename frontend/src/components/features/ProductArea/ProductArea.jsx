import React from "react";
import ProductCard from "../../ui/ProductCard/ProductCard";
import Spinner from "../../ui/Spinner/Spinner";
import useProducts from "../../../hooks/useProducts";
import { addProductToBasket } from "../../../api/BasketApi"
import { isTokenValid, isAdmin } from "../../../utils/auth";

export default function ProductArea({ filters }) {
    const { products, loading, error } = useProducts(filters);

    const handleAddToBasket = async(productId) => {
        const token = localStorage.getItem("token");
        if(!isTokenValid(token) || isAdmin(token)){
            alert("Корзина доступна только для пользователей");
            return;
        }
        const response = await addProductToBasket(productId, token);
        if(!response.ok){
            alert("Ошибка при добавлении");
            return;
        }
        alert("Товар добавлен в корзину");
    }

    if (loading) return <Spinner text="Загрузка товаров..." />;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-area">
            <div className="product-grid">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} onAddToBasket={handleAddToBasket}/>
                ))}
            </div>
        </div>
    );
}
