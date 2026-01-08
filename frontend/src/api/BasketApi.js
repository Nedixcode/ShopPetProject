export async function addProductToBasket(productId, token){
    return await fetch(`user/basket/${productId}`, {
        method: "POST",
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function getBasketProducts(token) {
    return await fetch("basket/products", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function deleteProductsFromBasket(ids, token) {
    return await fetch("basket", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ids),
    });
}
