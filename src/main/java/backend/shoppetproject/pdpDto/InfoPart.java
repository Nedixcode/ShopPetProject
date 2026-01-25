package backend.shoppetproject.pdpDto;

public class InfoPart {
    private String name;
    private String description;
    private Boolean isInStock;

    public InfoPart(String name, String description, Boolean isInStock) {
        this.name = name;
        this.description = description;
        this.isInStock = isInStock;
    }

    public Boolean getIsInStock() {
        return isInStock;
    }

    public void setIsInStock(Boolean isInStock) {
        this.isInStock = isInStock;
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
}
