package backend.shoppetproject.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "products")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "type")
    private String type;

    @Column(name = "price")
    private Integer price;

    @Column(name = "is_in_stock")
    private Boolean isInStock;

    @Column(name = "number_of_sales")
    private Integer numberOfSales;

    @ManyToMany(mappedBy = "productList")
    private List<BasketEntity> basketList;


    public ProductEntity() {
    }

    public ProductEntity(String name,
                         String description,
                         String type,
                         Integer price,
                         Boolean isInStock,
                         Integer numberOfSales,
                         List<BasketEntity> basketList
                         ) {
        this.name = name;
        this.basketList = basketList;
        this.numberOfSales = numberOfSales;
        this.isInStock = isInStock;
        this.price = price;
        this.type = type;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getPrice() {
        return price;
    }

    public Boolean getIsInStock() {
        return isInStock;
    }

    public Integer getNumberOfSales() {
        return numberOfSales;
    }

    public List<BasketEntity> getBasketEntityList() {
        return basketList;
    }
}

