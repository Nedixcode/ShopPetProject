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

    public ProductEntity(Long id,
                         String name,
                         String description,
                         String type,
                         Integer price,
                         Boolean isInStock,
                         Integer numberOfSales,
                         List<BasketEntity> basketEntityList) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.price = price;
        this.isInStock = isInStock;
        this.numberOfSales = numberOfSales;
        this.basketList = basketEntityList;
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

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Boolean getInStock() {
        return isInStock;
    }

    public void setInStock(Boolean inStock) {
        isInStock = inStock;
    }

    public Integer getNumberOfSales() {
        return numberOfSales;
    }

    public void setNumberOfSales(Integer numberOfSales) {
        this.numberOfSales = numberOfSales;
    }

    public List<BasketEntity> getBasketEntityList() {
        return basketList;
    }

    public void setBasketEntityList(List<BasketEntity> basketEntityList) {
        this.basketList = basketEntityList;
    }
}

