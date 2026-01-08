package backend.shoppetproject.dto;

import backend.shoppetproject.entity.BasketItemEntity;

public class BasketItemDto {
    private ProductDto product;
    private int quantity;

    public BasketItemDto(BasketItemEntity basketItem) {
        this.product = new ProductDto(basketItem.getProduct());
        this.quantity = basketItem.getQuantity();
    }

    public ProductDto getProduct() {
        return product;
    }

    public void setProduct(ProductDto product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
