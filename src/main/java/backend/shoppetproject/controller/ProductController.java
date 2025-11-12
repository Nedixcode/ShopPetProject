package backend.shoppetproject.controller;

import backend.shoppetproject.dto.FilterDto;
import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/products/search")
    public Page<ProductDto> searchProducts(@RequestBody FilterDto filter) {
        logger.info("вызвался метод searchProducts, filter = {}", filter.toString());

        return productService.searchProducts(filter).map(ProductDto::new);
    }
}
