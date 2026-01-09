package backend.shoppetproject.controller;

import backend.shoppetproject.dto.OrderDto;
import backend.shoppetproject.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    public ResponseEntity<OrderDto> createOrder(Principal principal) {
        logger.info("Вызвался метод createOrder, userName = {}", principal.getName());


        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(principal));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDto>> getOrders(Principal principal) {
        logger.info("Вызвался метод getOrders, userName = {}", principal.getName());

        return ResponseEntity.ok().body(orderService.getOrders(principal));
    }
}