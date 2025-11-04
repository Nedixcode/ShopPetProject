package backend.shoppetproject.dto;

import backend.shoppetproject.entity.BasketItemEntity;
import backend.shoppetproject.entity.ProductEntity;

public class BasketItemDto {
    private ProductEntity product;
    private int quantity;

    public BasketItemDto(BasketItemEntity basketItem) {
        this.product = basketItem.getProduct();
        this.quantity = basketItem.getQuantity();
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
