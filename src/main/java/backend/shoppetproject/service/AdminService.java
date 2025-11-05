package backend.shoppetproject.service;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class AdminService {

    private final ProductRepository productRepository;

    public AdminService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductDto createProduct(ProductDto productDto, MultipartFile imageFile) throws IOException {
        String imageUrl = saveImageFile(imageFile);

        ProductEntity productToCreate = new ProductEntity(
                productDto.getName(),
                productDto.getDescription(),
                productDto.getType(),
                productDto.getPrice(),
                productDto.getIsInStock()
        );

        productToCreate.setImageUrl(imageUrl);
        productRepository.save(productToCreate);

        return new ProductDto(productToCreate);
    }

    public ProductDto deleteProduct(Long id) {
        ProductEntity productToDelete = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Такой товар не найден"));

        if (productToDelete.getImageUrl() != null) {
            Path imagePath = Paths.get("." + productToDelete.getImageUrl());
            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                System.err.println("Не удалось удалить файл: " + imagePath);
            }
        }

        productRepository.delete(productToDelete);
        return new ProductDto(productToDelete);
    }

    public ProductDto updateProduct(Long id, ProductDto productDto, MultipartFile imageFile) throws IOException {
        ProductEntity productToUpdate = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Такой товар не найден"));

        productToUpdate.setName(productDto.getName());
        productToUpdate.setDescription(productDto.getDescription());
        productToUpdate.setType(productDto.getType());
        productToUpdate.setPrice(productDto.getPrice());
        productToUpdate.setIsInStock(productDto.getIsInStock());

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = saveImageFile(imageFile);
            productToUpdate.setImageUrl(imageUrl);
        }

        productRepository.save(productToUpdate);
        return new ProductDto(productToUpdate);
    }

    private String saveImageFile(MultipartFile imageFile) throws IOException {
        if (imageFile == null || imageFile.isEmpty()) {
            return null;
        }

        Path uploadDir = Paths.get("uploads/");

        String fileName = System.currentTimeMillis() % 1000000000 + ".png";
        Path filePath = uploadDir.resolve(fileName);
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/" + fileName;
    }
}