package backend.shoppetproject.controller;

import backend.shoppetproject.dto.FilterDto;
import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/products/search")
    public Page<ProductDto> searchProducts(@RequestBody FilterDto filter, Principal principal) {
        logger.info("вызвался метод searchProducts, filter = {}", filter.toString());

        String username = principal != null ? principal.getName() : null;
        return productService.searchProducts(filter, username);
    }
}
