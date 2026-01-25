package backend.shoppetproject.pdpDto;

import java.util.List;

public class FeedbackPart {
    private Double averageRating;
    private Integer totalReviews;
    private List<ReviewDto> reviews;

    public FeedbackPart(Double averageRating, Integer totalReviews, List<ReviewDto> reviews) {
        this.averageRating = averageRating;
        this.totalReviews = totalReviews;
        this.reviews = reviews;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(Integer totalReviews) {
        this.totalReviews = totalReviews;
    }

    public List<ReviewDto> getReviews() {
        return reviews;
    }

    public void setReviews(List<ReviewDto> reviews) {
        this.reviews = reviews;
    }
}
