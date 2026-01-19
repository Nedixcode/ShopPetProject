package backend.shoppetproject.service;

import backend.shoppetproject.dto.OrderDto;
import backend.shoppetproject.entity.BasketEntity;
import backend.shoppetproject.entity.BasketItemEntity;
import backend.shoppetproject.entity.OrderEntity;
import backend.shoppetproject.entity.OrderItemEntity;
import backend.shoppetproject.enums.OrderStatus;
import backend.shoppetproject.enums.PaymentStatus;
import backend.shoppetproject.repository.BasketRepository;
import backend.shoppetproject.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserOrderService {

    private final BasketRepository basketRepository;
    private final OrderRepository orderRepository;

    public UserOrderService(BasketRepository basketRepository, OrderRepository orderRepository) {
        this.basketRepository = basketRepository;
        this.orderRepository = orderRepository;
    }

    public OrderDto createOrder(Principal principal) {
        BasketEntity basket = basketRepository.findByUser_UserName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Корзина не найдена"));

        OrderEntity order = new OrderEntity();

        List<BasketItemEntity> basketItems = basket.getBasketItems();

        if (basketItems.isEmpty()) {
            throw new IllegalStateException("Корзина пуста");
        }

        List<OrderItemEntity> orderItems = basketItems.stream().map((basketItem) -> {
            OrderItemEntity orderItem = new OrderItemEntity();
            orderItem.setOrder(order);
            orderItem.setProduct(basketItem.getProduct());
            orderItem.setQuantity(basketItem.getQuantity());
            orderItem.setPriceAtPurchase(basketItem.getProduct().getPrice());
            return orderItem;
        }).toList();

        order.setCreatedAt(LocalDateTime.now());
        order.setUser(basket.getUser());
        order.setOrderStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.UNPAID);
        order.setEstimatedDeliveryTime(LocalDateTime.now().plusDays(3));
        order.setOrderItems(orderItems);

        OrderEntity savedOrder = orderRepository.save(order);

        basket.getBasketItems().clear();
        basketRepository.save(basket);

        return new OrderDto(savedOrder);
    }

    public List<OrderDto> getOrders(Principal principal) {
        List<OrderEntity> orders = orderRepository.findByUser_UserName(principal.getName());

        return orders.stream().map(OrderDto::new).toList();
    }

    @Transactional
    public OrderDto cancelOrder(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Заказ не найден"));

        if (order.getOrderStatus() == OrderStatus.DELIVERED) {
            throw new IllegalStateException("Нельзя отменить доставленный заказ");
        }

        if (order.getOrderStatus() == OrderStatus.CANCELLED) {
            throw new IllegalStateException("Заказ уже отменён");
        }

        order.setOrderStatus(OrderStatus.CANCELLED);

        return new OrderDto(order);
    }
}
