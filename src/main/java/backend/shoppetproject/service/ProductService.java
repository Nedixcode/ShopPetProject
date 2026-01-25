package backend.shoppetproject.service;

import backend.shoppetproject.dto.ProductFilter;
import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.entity.ReviewEntity;
import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.pdpDto.*;
import backend.shoppetproject.repository.ProductRepository;
import backend.shoppetproject.repository.ReviewRepository;
import backend.shoppetproject.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    public ProductService(ProductRepository productRepository,
                          UserRepository userRepository, ReviewRepository reviewRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }

    public Page<ProductDto> searchProducts(ProductFilter filter, String userName) {
        boolean hasQuery = filter.getQuery() != null && !filter.getQuery().isBlank();
        boolean hasSort = filter.getSortBy() != null;

        Sort sort;

        if (!hasQuery && !hasSort) {
            sort = Sort.by(Sort.Direction.DESC, "popularity");

        } else if (hasSort) {
            sort = Sort.by(
                    Sort.Direction.fromString(filter.getSortDirection()),
                    filter.getSortBy()
            );

        } else {
            sort = Sort.by(Sort.Direction.DESC, "popularity");
        }

        Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize(), sort);

        Page<ProductEntity> page = productRepository.searchProducts(
                filter.getQuery(),
                filter.getType(),
                filter.getIsInStock(),
                filter.getMinPrice(),
                filter.getMaxPrice(),
                pageable
        );

        Optional<UserEntity> user = userRepository.findByUserName(userName);

        if (user.isEmpty()) {
            return page.map(ProductDto::new);
        }

        Set<Long> favoriteIds = user.get().getFavoriteProducts()
                .stream()
                .map(ProductEntity::getId)
                .collect(Collectors.toSet());

        return page.map(product ->
                new ProductDto(product, favoriteIds.contains(product.getId()))
        );
    }

    public ProductPage getProductPage(Long id, String userName) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Такой товар не найден"));

        UserEntity user = userRepository.findByUserName(userName).orElse(null);

        List<ReviewEntity> reviews = reviewRepository.findByProduct(product);

        FeedbackPart feedbackPart = getFeedBackPart(reviews);
        BuyPart buyPart = getBuyPart(product, user);
        PhotoPart photoPart = new PhotoPart(product.getImageUrl());
        List<ProductDto> similarProducts = getSimilarProducts(product);
        InfoPart infoPart = getInfoPart(product);

        return new ProductPage(photoPart, infoPart, buyPart, feedbackPart, similarProducts);
    }
    
    private InfoPart getInfoPart(ProductEntity product) {
        return new InfoPart(product.getName(),
                product.getDescription(),
                product.getIsInStock());
    }

    private List<ProductDto> getSimilarProducts(ProductEntity product) {
        return productRepository.findSimilarProducts(
                product.getProductType(),
                product.getId(),
                PageRequest.of(0, 30)
        ).stream().map(ProductDto::new).toList();
    }

    public BuyPart getBuyPart(ProductEntity product, UserEntity user) {
        boolean isFavorite = false;

        if (user != null) {
            isFavorite = user.getFavoriteProducts()
                    .stream()
                    .anyMatch(fav -> fav.getId().equals(product.getId()));
        }

        return new BuyPart(product.getPrice(), isFavorite);
    }


    public FeedbackPart getFeedBackPart(List<ReviewEntity> reviews) {
        List<ReviewDto> reviewsDto = reviews.stream()
                .map(ReviewDto::new)
                .toList();

        int totalReviews = reviewsDto.size();

        double averageRating = totalReviews == 0
                ? 0.0
                : Math.round(
                (reviewsDto.stream().mapToInt(ReviewDto::getRating).sum() / (double) totalReviews) * 10.0
        ) / 10.0;

        return new FeedbackPart(averageRating, totalReviews, reviewsDto);
    }
}
