package backend.shoppetproject.pdpDto;

import backend.shoppetproject.entity.ReviewEntity;

public class ReviewDto {
    private String username;
    private Integer rating;
    private String comment;

    public ReviewDto(ReviewEntity reviewEntity) {
        this.username = reviewEntity.getUser().getUserName();
        this.rating = reviewEntity.getRating();
        this.comment = reviewEntity.getComment();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
