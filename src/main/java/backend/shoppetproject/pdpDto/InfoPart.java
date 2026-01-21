package backend.shoppetproject.pdpDto;

public class InfoPart {
    private String name;
    private Double rating;
    private String description;
    private Boolean isInStock;

    public Boolean getIsInStock() {
        return isInStock;
    }

    public void setIsINStock(Boolean isInStock) {
        this.isInStock = isInStock;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
