package backend.shoppetproject.service;

import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AdminService {

    private final ProductRepository productRepository;

    public AdminService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductEntity addProduct(ProductEntity productEntity) {

        Optional<ProductEntity> productToCreate = productRepository.findByNameAndDescription(
                productEntity.getName(),
                productEntity.getDescription()
        );

        if (productToCreate.isPresent()) {
            throw new IllegalArgumentException("Такой товар уже существует");
        }

        ProductEntity productEntityToCreate = new ProductEntity(
                productEntity.getName(),
                productEntity.getDescription(),
                productEntity.getType(),
                productEntity.getPrice(),
                productEntity.getIsInStock(),
                productEntity.getNumberOfSales(),
                productEntity.getBasketEntityList()
        );

        productRepository.save(productEntityToCreate);

        return productEntityToCreate;
    }

    public ProductEntity deleteProduct(ProductEntity productEntity) {

        Optional<ProductEntity> productToDelete = productRepository.findByNameAndDescription(
                productEntity.getName(),
                productEntity.getDescription()
        );

        if (productToDelete.isEmpty()) {
            throw new IllegalArgumentException("Такой товар не найден");
        }

        ProductEntity existingProductToDelete = productToDelete.get();
        productRepository.delete(existingProductToDelete);

        return existingProductToDelete;
    }
}
