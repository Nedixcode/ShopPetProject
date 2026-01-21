package backend.shoppetproject.entity;

import backend.shoppetproject.enums.ProductType;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "products")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ProductType type;

    @Column(name = "price")
    private Integer price;

    @Column(name = "is_in_stock")
    private Boolean isInStock;

    @Column(name = "number_of_sales")
    private Integer numberOfSales = 0;

    @Column(name = "popularity")
    private Integer popularity = 0;

    @Column(name = "image_url")
    private String imageUrl;

    @OneToMany(mappedBy = "product")
    private List<BasketItemEntity> basketItems;


    public ProductEntity() {
    }

    public ProductEntity(String name,
                         String description,
                         ProductType type,
                         Integer price,
                         Boolean isInStock) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.price = price;
        this.isInStock = isInStock;
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

    public ProductType getType() {
        return type;
    }

    public void setType(ProductType type) {
        this.type = type;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Boolean getIsInStock() {
        return isInStock;
    }

    public void setIsInStock(Boolean isInStock) {
        this.isInStock = isInStock;
    }

    public Integer getNumberOfSales() {
        return numberOfSales;
    }

    public void setNumberOfSales(int numberOfSales) {
        this.numberOfSales = numberOfSales;
    }

    public List<BasketItemEntity> getBasketItems() {
        return basketItems;
    }

    public void setBasketItems(List<BasketItemEntity> basketItems) {
        this.basketItems = basketItems;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getPopularity() {
        return popularity;
    }

    public void setPopularity(Integer popularity) {
        this.popularity = popularity;
    }
}
