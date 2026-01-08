export function mapBasketResponseToUi(data) {
    const items = (data || []).map((bi) => ({
        id: bi.product.id,
        name: bi.product.name,
        description: bi.product.description,
        price: bi.product.price,
        imageUrl: bi.product.imageUrl,
    }));

    const qtyById = {};
    (data || []).forEach((bi) => {
        qtyById[bi.product.id] = bi.quantity;
    });

    return { items, qtyById };
}
