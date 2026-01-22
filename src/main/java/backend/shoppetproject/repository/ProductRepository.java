package backend.shoppetproject.repository;

import backend.shoppetproject.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    @Query(value = """
            SELECT p.*
            FROM products p
            JOIN product_types t ON p.product_type_id = t.id
            WHERE (:query IS NULL OR p.name % :query OR p.description % :query)
            AND (:type IS NULL OR t.name = :type)
            AND (:isInStock IS NULL OR p.is_in_stock = :isInStock)
            AND (:minPrice IS NULL OR p.price >= :minPrice)
            AND (:maxPrice IS NULL OR p.price <= :maxPrice)
            """,
            countQuery = """
            SELECT COUNT(*)
            FROM products p
            JOIN product_types t ON p.product_type_id = t.id
            WHERE (:query IS NULL OR p.name % :query OR p.description % :query)
            AND (:type IS NULL OR t.name = :type)
            AND (:isInStock IS NULL OR p.is_in_stock = :isInStock)
            AND (:minPrice IS NULL OR p.price >= :minPrice)
            AND (:maxPrice IS NULL OR p.price <= :maxPrice)
            """,
            nativeQuery = true)
    Page<ProductEntity> searchProducts(
            @Param("query") String query,
            @Param("type") String type,
            @Param("isInStock") Boolean isInStock,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            Pageable pageable
    );
}
