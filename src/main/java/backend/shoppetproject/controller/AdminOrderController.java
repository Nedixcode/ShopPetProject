package backend.shoppetproject.controller;

import backend.shoppetproject.dto.OrderDto;
import backend.shoppetproject.dto.OrderFilter;
import backend.shoppetproject.service.AdminOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/orders")
public class AdminOrderController {

    private static final Logger logger = LoggerFactory.getLogger(AdminOrderController.class);

    private final AdminOrderService adminOrderService;

    public AdminOrderController(AdminOrderService adminOrderService) {
        this.adminOrderService = adminOrderService;
    }

    @PutMapping("/{id}/in_transit")
    public ResponseEntity<OrderDto> setInTransit(@PathVariable Long id) {
        logger.info("вызвался метод setInTransit, id товара = {}", id);

        return ResponseEntity.ok(adminOrderService.setOrderInTransit(id));
    }

    @PutMapping("/{id}/deliver")
    public ResponseEntity<OrderDto> setDelivered(@PathVariable Long id) {
        logger.info("вызвался метод setDelivered, id товара = {}", id);

        return ResponseEntity.ok(adminOrderService.setOrderDelivered(id));
    }

    @PostMapping("/search")
    public ResponseEntity<Page<OrderDto>> searchOrders(@RequestBody OrderFilter filter) {
        logger.info("вызвался метод searchOrders, filter = {}", filter.toString());

        return ResponseEntity.ok(adminOrderService.searchOrders(filter));
    }
}
