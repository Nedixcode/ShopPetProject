package backend.shoppetproject.controller;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @GetMapping("/products/search")
    public ResponseEntity<List<ProductDto>> searchProducts(@RequestParam String query) {
        logger.info("вызвался метод searchProduct cо строкой = {}", query);

        List<ProductEntity> entities = productService.searchProduct(query);
        List<ProductDto> dtoList = entities.stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        logger.info("вызвался метод getAllProducts");

        List<ProductEntity> entities = productService.getAllProduct();
        List<ProductDto> dtoList = entities.stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }
}
