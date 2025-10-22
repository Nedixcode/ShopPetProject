package backend.shoppetproject.repository;

import backend.shoppetproject.entity.BasketEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BasketRepository extends JpaRepository<BasketEntity, Long> {

}
