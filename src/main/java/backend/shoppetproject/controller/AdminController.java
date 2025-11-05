package backend.shoppetproject.controller;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.service.AdminService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping(value = "/product", consumes = {"multipart/form-data"})
    public ResponseEntity<ProductDto> createProduct(
            @RequestPart("product") String productJson,
            @RequestPart(value = "image", required = false) MultipartFile imageFile

    ) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ProductDto productDto = objectMapper.readValue(productJson, ProductDto.class);

        logger.info("Добавление товара: {}", productDto.getName());

        ProductDto saved = adminService.createProduct(productDto, imageFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<ProductDto> deleteProduct(@PathVariable Long id) {
        logger.info("вызвался метод deleteProduct, id = {}", id);

        return ResponseEntity.ok(adminService.deleteProduct(id));
    }

    @PutMapping(value = "/product/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<ProductDto> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") ProductDto productDto,
            @RequestPart(value = "image", required = false) MultipartFile imageFile

    ) throws IOException {
        logger.info("Обновление товара: {}", productDto.getName());

        return ResponseEntity.ok(adminService.updateProduct(id, productDto, imageFile));
    }
}