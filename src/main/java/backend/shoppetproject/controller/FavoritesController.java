package backend.shoppetproject.controller;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.service.FavoritesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
public class FavoritesController {

    private static final Logger logger = LoggerFactory.getLogger(FavoritesController.class);

    private final FavoritesService favoritesService;

    public FavoritesController(FavoritesService favoritesService) {
        this.favoritesService = favoritesService;
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<ProductDto>> getProductsInFavorites(Principal principal) {
        logger.info("вызвался метод getProductsInFavorites, userName = {}", principal.getName());

        return ResponseEntity.ok(favoritesService.getProductsInFavorites(principal));
    }

    @PostMapping("/favorites/{id}")
    public ResponseEntity<ProductDto> addProductToFavorites(@PathVariable Long id, Principal principal) {
        logger.info("вызвался метод addProductToFavorites, id товара = {}, userName = {}",
                id, principal.getName());

        return ResponseEntity.ok(favoritesService.addProductToFavorites(id, principal));
    }

    @DeleteMapping("/favorites/{id}")
    public ResponseEntity<ProductDto> deleteProductFromFavorites(@PathVariable Long id, Principal principal) {
        logger.info("вызвался метод deleteProductFromFavorites, id товара = {}, userName = {}",
                id, principal.getName());

        return ResponseEntity.ok(favoritesService.deleteProductFromFavorites(id, principal));
    }
}
