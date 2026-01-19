package backend.shoppetproject.controller;

import backend.shoppetproject.dto.BasketItemDto;
import backend.shoppetproject.service.BasketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user/basket")
public class BasketController {

    private static final Logger logger = LoggerFactory.getLogger(BasketController.class);

    private final BasketService basketService;

    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }

    @GetMapping("/products")
    public ResponseEntity<List<BasketItemDto>> getProductsInBasket(Principal principal) {
        logger.info("вызвался метод getProductsInBasket, userName = {}", principal.getName());

        return ResponseEntity.ok(basketService.getProductsInBasket(principal));
    }

    @PostMapping("/{id}")
    public ResponseEntity<BasketItemDto> addProductToBasket(@PathVariable Long id, Principal principal) {
        logger.info("вызвался метод addProductToBasket, id товара = {}, userName = {}",
                id, principal.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(basketService.addProductToBasket(id, principal));
    }

    @DeleteMapping()
    public ResponseEntity<List<BasketItemDto>> deleteProductsFromBasket(@RequestBody List<Long> ids,
                                                                        Principal principal) {
        logger.info("вызвался метод deleteProductsFromBasket, ids товаров = {}, userName = {}",
                ids, principal.getName());

        return ResponseEntity.ok(basketService.deleteProductsFromBasket(ids, principal));
    }

    @PutMapping("/{id}/increase")
    public ResponseEntity<BasketItemDto> increaseCountOfProduct(@PathVariable Long id, Principal principal) {
        logger.info("вызвался метод increaseCountOfProduct, id товара = {}. userName = {}",
                id, principal.getName());

        return ResponseEntity.ok(basketService.increaseCountOfProduct(id, principal));
    }

    @PutMapping("/{id}/decrease")
    public ResponseEntity<BasketItemDto> decreaseCountOfProduct(@PathVariable Long id, Principal principal) {
        logger.info("вызвался метод decreaseCountOfProduct, id товара = {}. userName = {}",
                id, principal.getName());

        return ResponseEntity.ok(basketService.decreaseCountOfProduct(id, principal));
    }
}
