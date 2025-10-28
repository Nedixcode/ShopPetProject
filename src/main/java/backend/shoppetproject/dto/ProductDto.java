package backend.shoppetproject.dto;

import backend.shoppetproject.entity.ProductEntity;

public class ProductDto {
    private Long id;
    private String name;
    private Integer price;
    private String description;
    private String type;

    public ProductDto(ProductEntity entity) {
        this.price = entity.getPrice();
        this.id = entity.getId();
        this.name = entity.getName();
        this.description = entity.getDescription();
        this.type = entity.getType();
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
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

}



