package backend.shoppetproject.dto;

import backend.shoppetproject.entity.OrderEntity;
import backend.shoppetproject.enums.OrderStatus;
import backend.shoppetproject.enums.PaymentStatus;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {
    private LocalDateTime createdAt;
    private LocalDateTime estimatedDeliveryTime;
    private PaymentStatus paymentStatus;
    private OrderStatus orderStatus;
    private List<OrderItemDto> orderItems;

    public OrderDto(OrderEntity order) {
        this.createdAt = order.getCreatedAt();
        this.estimatedDeliveryTime = order.getEstimatedDeliveryTime();
        this.paymentStatus = order.getPaymentStatus();
        this.orderStatus = order.getOrderStatus();
        this.orderItems = order.getOrderItems()
                .stream()
                .map(OrderItemDto::new)
                .toList();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getEstimatedDeliveryTime() {
        return estimatedDeliveryTime;
    }

    public void setEstimatedDeliveryTime(LocalDateTime estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public List<OrderItemDto> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDto> orderItems) {
        this.orderItems = orderItems;
    }
}