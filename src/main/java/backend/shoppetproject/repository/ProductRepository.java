package backend.shoppetproject.repository;

import backend.shoppetproject.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    Optional<ProductEntity> findByNameAndDescription(String name, String description);

    List<ProductEntity> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrTypeContainingIgnoreCase(
            String query, String query1, String query2);
}
