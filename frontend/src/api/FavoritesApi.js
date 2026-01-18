export async function addProductToFavorite (id, token){
    return await fetch(`/user/favorites/${id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getFavorites (token){
    const response = await fetch (`/user/favorites`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }
    });

    return await response.json();
}

export async function deleteFavorites (token, productId) {
    return await fetch (`/user/favorites/${productId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}