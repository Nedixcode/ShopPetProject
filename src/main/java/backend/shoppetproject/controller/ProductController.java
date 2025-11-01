package backend.shoppetproject.controller;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<ProductDto>> searchProducts(@RequestParam String query) {
        logger.info("вызвался метод searchProduct cо строкой = {}", query);

        return ResponseEntity.ok(productService.searchProduct(query));
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        logger.info("вызвался метод getAllProducts");

        return ResponseEntity.ok(productService.getAllProducts());
    }
}
