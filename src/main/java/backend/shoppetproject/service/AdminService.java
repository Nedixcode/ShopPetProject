package backend.shoppetproject.service;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final ProductRepository productRepository;

    public AdminService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductDto createProduct(ProductDto productDto) {
        ProductEntity productToCreate = new ProductEntity(
                productDto.getName(),
                productDto.getDescription(),
                productDto.getType(),
                productDto.getPrice(),
                productDto.getIsInStock()
        );

        productRepository.save(productToCreate);
        return productDto;
    }

    public ProductDto deleteProduct(Long id) {
        ProductEntity productToDelete = productRepository.findById(id).
                orElseThrow(() -> new EntityNotFoundException("Такой товар не найден"));

        productRepository.delete(productToDelete);
        return new ProductDto(productToDelete);
    }

    public ProductDto updateProduct(Long id, ProductDto productDto) {
        ProductEntity productToUpdate = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Такой товар не найден"));

        productToUpdate.setName(productDto.getName());
        productToUpdate.setDescription(productDto.getDescription());
        productToUpdate.setType(productDto.getType());
        productToUpdate.setPrice(productDto.getPrice());
        productToUpdate.setIsInStock(productDto.getIsInStock());

        productRepository.save(productToUpdate);
        return productDto;
    }
}