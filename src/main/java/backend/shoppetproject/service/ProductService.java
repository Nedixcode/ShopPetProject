package backend.shoppetproject.service;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    public final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDto> searchProduct(String query) {
        List<ProductEntity> entities = productRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrTypeContainingIgnoreCase(
                        query, query, query);

        return entities.stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());
    }

    public List<ProductDto> getAllProducts() {
        List<ProductEntity> entities = productRepository.findAll();

        return entities.stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());
    }
}
