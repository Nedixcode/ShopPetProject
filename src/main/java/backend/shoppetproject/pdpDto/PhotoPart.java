package backend.shoppetproject.pdpDto;

import java.util.List;

public class PhotoPart {
    private String mainImage;
    private List<String> gallery;

    public String getMainImage() {
        return mainImage;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
    }

    public List<String> getGallery() {
        return gallery;
    }

    public void setGallery(List<String> gallery) {
        this.gallery = gallery;
    }
}
