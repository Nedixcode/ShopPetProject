package backend.shoppetproject.controller;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.service.AdminService;
import backend.shoppetproject.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    private final ProductService productService;

    public AdminController(AdminService adminService, ProductService productService) {
        this.adminService = adminService;
        this.productService = productService;
    }

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @PostMapping("/product")
    public ResponseEntity<ProductEntity> addProduct (@RequestBody ProductEntity productEntity) {
        logger.info("Вызвался метод addProduct");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adminService.addProduct(productEntity));
    }

    @DeleteMapping("/product")
    public ResponseEntity<ProductEntity> deleteProduct(@RequestBody ProductEntity productEntity) {
        logger.info("вызвался метод deleteProduct");

        return ResponseEntity.status(HttpStatus.OK)
                .body(adminService.deleteProduct(productEntity));
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<ProductDto>> searchProduct(@RequestParam String query) {
        logger.info("вызвался метод searchProduct cо строкой = {}", query);

        List<ProductEntity> entities = productService.searchProduct(query);
        List<ProductDto> dtoList = entities.stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }
}
