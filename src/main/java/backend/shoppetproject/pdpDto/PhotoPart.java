package backend.shoppetproject.pdpDto;

public class PhotoPart {
    private String mainPhotoUrl;

    public PhotoPart(String mainPhotoUrl) {
        this.mainPhotoUrl = mainPhotoUrl;
    }

    public String getMainPhotoUrl() {
        return mainPhotoUrl;
    }

    public void setMainPhotoUrl(String mainPhotoUrl) {
        this.mainPhotoUrl = mainPhotoUrl;
    }
}
