export async function addProductToFavorite (id, token){
    return await fetch(`/user/favorites/${id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getFavorites (){
    return await fetch (`/user/favorites`, {
        method: "GET",
    });
}