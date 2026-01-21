package backend.shoppetproject.controller;

import backend.shoppetproject.dto.ProductFilter;
import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.pdpDto.ProductPage;
import backend.shoppetproject.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RequestMapping("/products")
@RestController
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/search")
    public Page<ProductDto> searchProducts(@RequestBody ProductFilter filter, Principal principal) {
        logger.info("вызвался метод searchProducts, filter = {}", filter.toString());

        String username = principal != null ? principal.getName() : null;
        return productService.searchProducts(filter, username);
    }

    @GetMapping("/{id}")
    public ProductPage getProductPage(@PathVariable Long id) {
        return productService.getProductPage(id);
    }
}
