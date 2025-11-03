package backend.shoppetproject.repository;

import backend.shoppetproject.entity.BasketEntity;
import backend.shoppetproject.entity.BasketItemEntity;
import backend.shoppetproject.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BasketItemRepository extends JpaRepository<BasketItemEntity, Long> {

    List<BasketItemEntity> findByBasket(BasketEntity basket);

    Optional<BasketItemEntity> findByBasketAndProduct(BasketEntity basket, ProductEntity product);
}
