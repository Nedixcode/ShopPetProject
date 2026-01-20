package backend.shoppetproject.repository;

import backend.shoppetproject.entity.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    List<OrderEntity> findByUser_UserName(String userUserName);

    @Query(value = """
            SELECT o.*
            FROM orders o
            JOIN users u ON o.user_id = u.id
            WHERE (:orderStatus IS NULL OR o.order_status = :orderStatus)
            AND (:paymentStatus IS NULL OR o.payment_status = :paymentStatus)
            AND (:username IS NULL OR u.user_name = :username)
            AND o.created_at BETWEEN :fromDate AND :toDate
            """,
            countQuery = """
            SELECT COUNT(o.id)
            FROM orders o
            JOIN users u ON o.user_id = u.id
            WHERE (:orderStatus IS NULL OR o.order_status = :orderStatus)
            AND (:paymentStatus IS NULL OR o.payment_status = :paymentStatus)
            AND (:username IS NULL OR u.user_name = :username)
            AND o.created_at BETWEEN :fromDate AND :toDate
            """,
            nativeQuery = true)
    Page<OrderEntity> searchOrders(
            @Param("orderStatus") String orderStatus,
            @Param("paymentStatus") String paymentStatus,
            @Param("username") String username,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate,
            Pageable pageable
    );
}
