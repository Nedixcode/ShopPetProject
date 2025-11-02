package backend.shoppetproject.repository;

import backend.shoppetproject.entity.BasketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BasketRepository extends JpaRepository<BasketEntity, Long> {

    Optional<BasketEntity> findByUserId(Long userId);
}