package backend.shoppetproject.repository;

import backend.shoppetproject.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByFirstNameAndPassword(String firstName, String password);
}
