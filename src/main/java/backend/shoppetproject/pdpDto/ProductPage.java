package backend.shoppetproject.pdpDto;

import backend.shoppetproject.dto.ProductDto;

import java.util.List;

public class ProductPage {
    private PhotoPart photoPart;
    private InfoPart infoPart;
    private BuyPart buyPart;
    private FeedbackPart feedbackPart;
    private List<ProductDto> similarProducts;

    public ProductPage(PhotoPart photoPart,
                       InfoPart infoPart,
                       BuyPart buyPart,
                       FeedbackPart feedbackPart,
                       List<ProductDto> similarProducts) {
        this.photoPart = photoPart;
        this.infoPart = infoPart;
        this.buyPart = buyPart;
        this.feedbackPart = feedbackPart;
        this.similarProducts = similarProducts;
    }

    public PhotoPart getPhotoPart() {
        return photoPart;
    }

    public void setPhotoPart(PhotoPart photoPart) {
        this.photoPart = photoPart;
    }

    public InfoPart getInfoPart() {
        return infoPart;
    }

    public void setInfoPart(InfoPart infoPart) {
        this.infoPart = infoPart;
    }

    public BuyPart getBuyPart() {
        return buyPart;
    }

    public void setBuyPart(BuyPart buyPart) {
        this.buyPart = buyPart;
    }

    public FeedbackPart getFeedbackPart() {
        return feedbackPart;
    }

    public void setFeedbackPart(FeedbackPart feedbackPart) {
        this.feedbackPart = feedbackPart;
    }

    public List<ProductDto> getSimilarProducts() {
        return similarProducts;
    }

    public void setSimilarProducts(List<ProductDto> similarProducts) {
        this.similarProducts = similarProducts;
    }
}
