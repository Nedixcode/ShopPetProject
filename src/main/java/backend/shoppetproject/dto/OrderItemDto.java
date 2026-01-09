package backend.shoppetproject.dto;

import backend.shoppetproject.entity.OrderItemEntity;

public class OrderItemDto {
    private Integer quantity;
    private Integer priceAtPurchase;
    private ProductDto product;

    public OrderItemDto(OrderItemEntity orderItem) {
        this.quantity = orderItem.getQuantity();
        this.priceAtPurchase = orderItem.getPriceAtPurchase();
        this.product = new ProductDto(orderItem.getProduct());
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getPriceAtPurchase() {
        return priceAtPurchase;
    }

    public void setPriceAtPurchase(Integer priceAtPurchase) {
        this.priceAtPurchase = priceAtPurchase;
    }

    public ProductDto getProduct() {
        return product;
    }

    public void setProduct(ProductDto product) {
        this.product = product;
    }
}
