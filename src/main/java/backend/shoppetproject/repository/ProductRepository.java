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
            SELECT *
            FROM products
            WHERE (word_similarity(name, :query) > 0.2
            OR word_similarity(description, :query) > 0.2)
            AND(:type IS NULL OR type = :type)
            AND (:isInStock IS NULL OR is_in_stock = :isInStock)
            AND (:minPrice IS NULL OR price >= :minPrice)
            AND (:maxPrice IS NULL OR price <= :maxPrice)
            ORDER BY GREATEST(similarity(name, :query), similarity(description, :query)) DESC
            """,
            countQuery = """
            SELECT COUNT(*)
            FROM products
            WHERE (word_similarity(name, :query) > 0.2
            OR word_similarity(description, :query) > 0.2)
            AND(:type IS NULL OR type = :type)
            AND (:isInStock IS NULL OR is_in_stock = :isInStock)
            AND (:minPrice IS NULL OR price >= :minPrice)
            AND (:maxPrice IS NULL OR price <= :maxPrice)
            """,
            nativeQuery = true)
    Page<ProductEntity> searchProductsByAutoSort(
            @Param("query") String query,
            @Param("type") String type,
            @Param("isInStock") Boolean isInStock,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            Pageable pageable
    );

    @Query(value = """
            SELECT *
            FROM products
            WHERE (word_similarity(name, :query) > 0.2
            OR word_similarity(description, :query) > 0.2)
            AND(:type IS NULL OR type = :type)
            AND (:isInStock IS NULL OR is_in_stock = :isInStock)
            AND (:minPrice IS NULL OR price >= :minPrice)
            AND (:maxPrice IS NULL OR price <= :maxPrice)
            """,
            countQuery = """
            SELECT COUNT(*)
            FROM products
            WHERE (word_similarity(name, :query) > 0.2
            OR word_similarity(description, :query) > 0.2)
            AND(:type IS NULL OR type = :type)
            AND (:isInStock IS NULL OR is_in_stock = :isInStock)
            AND (:minPrice IS NULL OR price >= :minPrice)
            AND (:maxPrice IS NULL OR price <= :maxPrice)
            """,
            nativeQuery = true)
    Page<ProductEntity> searchProductsByCustomSort(
            @Param("query") String query,
            @Param("type") String type,
            @Param("isInStock") Boolean isInStock,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            Pageable pageable
    );
}
