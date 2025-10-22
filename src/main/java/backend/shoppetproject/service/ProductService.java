package backend.shoppetproject.service;

import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    public final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductEntity> searchProduct(String query) {
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrTypeContainingIgnoreCase(
                query, query, query
        );
    }
}
