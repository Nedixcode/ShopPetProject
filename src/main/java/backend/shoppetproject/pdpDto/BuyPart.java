package backend.shoppetproject.pdpDto;

public class BuyPart {
    private Integer price;
    private boolean isFavorite; // если пользователь авторизован

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public boolean isFavorite() {
        return isFavorite;
    }

    public void setFavorite(boolean favorite) {
        isFavorite = favorite;
    }
}
