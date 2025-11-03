package backend.shoppetproject.repository;

import backend.shoppetproject.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    List<ProductEntity> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrTypeContainingIgnoreCase(
            String name, String description, String type);
}
