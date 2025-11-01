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

    public ProductDto createProduct(ProductEntity product) {
        ProductEntity productToCreate = new ProductEntity(
                product.getName(),
                product.getDescription(),
                product.getType(),
                product.getPrice(),
                product.getIsInStock(),
                product.getNumberOfSales(),
                product.getBasketEntityList()
        );

        productRepository.save(productToCreate);
        return new ProductDto(productToCreate);
    }

    public ProductDto deleteProduct(Long id) {
        ProductEntity productToDelete = productRepository.findById(id).
                orElseThrow(() -> new EntityNotFoundException("Такой товар не найден"));

        productRepository.delete(productToDelete);
        return new ProductDto(productToDelete);
    }

    public ProductDto updateProduct(Long id, ProductEntity product) {
        ProductEntity productToUpdate = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Такой товар не найден"));

        productToUpdate.setName(product.getName());
        productToUpdate.setDescription(product.getDescription());
        productToUpdate.setType(product.getType());
        productToUpdate.setPrice(product.getPrice());
        productToUpdate.setIsInStock(product.getIsInStock());

        productRepository.save(productToUpdate);
        return new ProductDto(productToUpdate);
    }
}
