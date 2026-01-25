package backend.shoppetproject.controller;

import backend.shoppetproject.dto.OrderDto;
import backend.shoppetproject.service.UserOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user/orders")
public class UserOrderController {

    private static final Logger logger = LoggerFactory.getLogger(UserOrderController.class);

    private final UserOrderService userOrderService;

    public UserOrderController(UserOrderService userOrderService) {
        this.userOrderService = userOrderService;
    }

    @PostMapping()
    public ResponseEntity<OrderDto> createOrder(Principal principal) {
        logger.info("Вызвался метод createOrder, userName = {}", principal.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(userOrderService.createOrder(principal));
    }

    @GetMapping()
    public ResponseEntity<List<OrderDto>> getOrders(Principal principal) {
        logger.info("Вызвался метод searchOrders, userName = {}", principal.getName());

        return ResponseEntity.ok().body(userOrderService.getOrders(principal));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<OrderDto> cancelOrder(@PathVariable Long id,
                                                Principal principal) throws IllegalAccessException {
        logger.info("вызвался cancelOrder, id товара = {}, userName = {}", id, principal.getName());

        return ResponseEntity.ok(userOrderService.cancelOrder(id, principal));
    }
}
