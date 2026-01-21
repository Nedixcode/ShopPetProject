package backend.shoppetproject.service;

import backend.shoppetproject.dto.OrderDto;
import backend.shoppetproject.dto.OrderFilter;
import backend.shoppetproject.entity.*;
import backend.shoppetproject.enums.OrderStatus;
import backend.shoppetproject.repository.*;
import jakarta.persistence.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
public class AdminOrderService {

    private final OrderRepository orderRepository;

    public AdminOrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public OrderDto setOrderInTransit(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Заказ не найден"));

        if (order.getOrderStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("В путь можно отправить только заказ в ожидании");
        }

        order.setOrderStatus(OrderStatus.IN_TRANSIT);

        return new OrderDto(order);
    }

    @Transactional
    public OrderDto setOrderDelivered(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Заказ не найден"));

        if (order.getOrderStatus() != OrderStatus.IN_TRANSIT) {
            throw new IllegalStateException("Доставить можно только заказ в пути");
        }

        order.setOrderStatus(OrderStatus.DELIVERED);

        return new OrderDto(order);
    }

    public Page<OrderDto> searchOrders(OrderFilter filter) {

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime fromDate;

        if (filter.getDays() != null && filter.getDays() > 0) {
            fromDate = now.minusDays(filter.getDays());
        } else {
            fromDate = LocalDateTime.MIN;
        }

        Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize());

        return orderRepository.searchOrders(
                filter.getOrderStatus(),
                filter.getPaymentStatus(),
                filter.getUserName(),
                fromDate,
                now,
                pageable
        ).map(OrderDto::new);
    }
}
