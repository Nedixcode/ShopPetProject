package backend.shoppetproject.controller;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/product")
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductEntity productEntity) {
        logger.info("Вызвался метод addProduct, id = {}, name = {}",
                productEntity.getId(), productEntity.getName());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adminService.createProduct(productEntity));
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<ProductDto> deleteProduct(@PathVariable Long id) {
        logger.info("вызвался метод deleteProduct, id = {}", id);

        return ResponseEntity.ok(adminService.deleteProduct(id));
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id,
                                                    @RequestBody ProductEntity productEntity) {
        logger.info("Вызвался метод updateProduct, id = {}, name = {}",
                productEntity.getId(), productEntity.getName());

        return ResponseEntity.ok(adminService.updateProduct(id, productEntity));
    }
}
