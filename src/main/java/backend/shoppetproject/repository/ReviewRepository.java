package backend.shoppetproject.repository;

import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {

    List<ReviewEntity> findByProduct(ProductEntity product);
}
