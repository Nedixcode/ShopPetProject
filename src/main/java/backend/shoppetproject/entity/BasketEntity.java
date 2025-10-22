package backend.shoppetproject.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "basket")
public class BasketEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToMany
    @JoinTable(
            name = "basket_goods",
            joinColumns = @JoinColumn(name = "basket_id"),
            inverseJoinColumns = @JoinColumn(name = "good_id")
    )
    private List<ProductEntity> productList;


    public BasketEntity() {
    }

    public BasketEntity(UserEntity user, List<ProductEntity> productList) {
        this.user = user;
        this.productList = productList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getUserEntity() {
        return user;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.user = userEntity;
    }

    public List<ProductEntity> getProductEntityList() {
        return productList;
    }

    public void setProductEntityList(List<ProductEntity> productEntityList) {
        this.productList = productEntityList;
    }
}

