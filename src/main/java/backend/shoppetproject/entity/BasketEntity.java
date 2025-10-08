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
    private UserEntity userEntity;

    @ManyToMany
    @JoinTable(
            name = "basket_goods",
            joinColumns = @JoinColumn(name = "basket_id"),
            inverseJoinColumns = @JoinColumn(name = "good_id")
    )
    private List<ProductEntity> productEntityList;


    public BasketEntity(Long id, UserEntity userEntity, List<ProductEntity> productEntityList) {
        this.id = id;
        this.userEntity = userEntity;
        this.productEntityList = productEntityList;
    }

    public BasketEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public List<ProductEntity> getProductEntityList() {
        return productEntityList;
    }

    public void setProductEntityList(List<ProductEntity> productEntityList) {
        this.productEntityList = productEntityList;
    }
}

