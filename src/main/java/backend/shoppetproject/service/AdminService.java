package backend.shoppetproject.service;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class AdminService {

    private final ProductRepository productRepository;
    private final ImageService imageService;

    public AdminService(ProductRepository productRepository, ImageService imageService) {
        this.productRepository = productRepository;
        this.imageService = imageService;
    }

    public ProductDto createProduct(ProductDto productDto, MultipartFile imageFile) throws IOException {
        String imageUrl = imageService.saveImage(imageFile);

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

        imageService.deleteImage(productToDelete);

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
            String imageUrl = imageService.saveImage(imageFile);
            productToUpdate.setImageUrl(imageUrl);
        }

        productRepository.save(productToUpdate);
        return new ProductDto(productToUpdate);
    }
}