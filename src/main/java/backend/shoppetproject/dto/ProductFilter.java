package backend.shoppetproject.dto;

import backend.shoppetproject.enums.ProductType;

public class ProductFilter {
    private String query;
    private ProductType type;
    private Boolean isInStock;
    private Integer minPrice;
    private Integer maxPrice;
    private String sortBy;
    private String sortDirection;
    private int page;
    private int size;

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public ProductType getType() {
        return type;
    }

    public void setType(ProductType type) {
        this.type = type;
    }

    public Boolean getIsInStock() {
        return isInStock;
    }

    public void setIsInStock(Boolean isInStock) {
        this.isInStock = isInStock;
    }

    public Integer getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Integer minPrice) {
        this.minPrice = minPrice;
    }

    public Integer getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Integer maxPrice) {
        this.maxPrice = maxPrice;
    }

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    public String getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(String sortDirection) {
        this.sortDirection = sortDirection;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    @Override
    public String toString() {
        return "FilterDto{" +
                "query='" + query + '\'' +
                ", type='" + type + '\'' +
                ", isInStock=" + isInStock +
                ", minPrice=" + minPrice +
                ", maxPrice=" + maxPrice +
                ", sortBy='" + sortBy + '\'' +
                ", sortDirection='" + sortDirection + '\'' +
                ", page=" + page +
                ", size=" + size +
                '}';
    }
}
