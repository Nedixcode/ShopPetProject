package backend.shoppetproject.repository;

import backend.shoppetproject.entity.BasketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BasketRepository extends JpaRepository<BasketEntity, Long> {

    Optional<BasketEntity> findByUser_UserName(String user_userName);
}