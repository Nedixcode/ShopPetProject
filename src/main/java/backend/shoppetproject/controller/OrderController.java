package backend.shoppetproject.controller;

import backend.shoppetproject.dto.OrderDto;
import backend.shoppetproject.entity.OrderEntity;
import backend.shoppetproject.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
@RequestMapping("/user")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/order")
    public ResponseEntity<OrderDto> createOrder(Principal principal) {
        logger.info("Вызвался метод createOrder, userName = {}", principal.getName());

        return ResponseEntity.ok(orderService.createOrder(principal));
    }
}