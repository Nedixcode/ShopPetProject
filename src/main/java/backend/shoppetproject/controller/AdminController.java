package backend.shoppetproject.controller;

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

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
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
}
