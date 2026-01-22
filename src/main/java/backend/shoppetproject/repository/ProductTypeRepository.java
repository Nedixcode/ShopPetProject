package backend.shoppetproject.repository;

import backend.shoppetproject.entity.ProductTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProductTypeRepository extends JpaRepository<ProductTypeEntity, Long> {

    Optional<ProductTypeEntity> findByName(String name);
}
