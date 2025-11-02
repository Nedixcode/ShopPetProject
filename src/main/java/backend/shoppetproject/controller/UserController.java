package backend.shoppetproject.controller;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/basket/products")
    public ResponseEntity<List<ProductDto>> getProductsInBasket(Principal principal) {
        logger.info("вызвался метод getProductsInBasket, userName = {}", principal.getName());

        return ResponseEntity.ok(userService.getProductInBasket(principal));
    }

    @PostMapping("/basket/{id}")
    public ResponseEntity<ProductDto> addProductToBasket(@PathVariable Long id, Principal principal) {
        logger.info("вызвался метод addProductToBasket, id товара = {}, userName = {}",
                id, principal.getName());

        return ResponseEntity.ok(userService.addProductToBasket(id, principal));
    }

    @DeleteMapping("/basket/{id}")
    public ResponseEntity<ProductDto> deleteProductFromBasket(@PathVariable Long id, Principal principal) {
        logger.info("вызвался метод deleteProductFromBasket, id товара = {}, userName = {}",
                id, principal.getName());

        return ResponseEntity.ok(userService.deleteProductFromBasket(id, principal));
    }
}