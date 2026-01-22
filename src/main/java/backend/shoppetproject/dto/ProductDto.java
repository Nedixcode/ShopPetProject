package backend.shoppetproject.dto;

import backend.shoppetproject.entity.ProductEntity;

public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private String type;
    private Integer price;
    private Boolean isInStock;
    private Boolean isFavorite;
    private String imageUrl;

    public ProductDto() {}

    public ProductDto(ProductEntity entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.description = entity.getDescription();
        this.type = entity.getProductType().getName();
        this.price = entity.getPrice();
        this.isInStock = entity.getIsInStock();
        this.imageUrl = entity.getImageUrl();
    }

    public ProductDto(ProductEntity entity, Boolean isFavorite) {
        this(entity);
        this.isFavorite = isFavorite;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Boolean getFavorite() {
        return isFavorite;
    }

    public void setFavorite(Boolean favorite) {
        isFavorite = favorite;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getIsInStock() {
        return isInStock;
    }

    public void setIsInStock(Boolean isInStock) {
        this.isInStock = isInStock;
    }
}
