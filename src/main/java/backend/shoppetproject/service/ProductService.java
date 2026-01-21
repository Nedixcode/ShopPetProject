package backend.shoppetproject.service;

import backend.shoppetproject.dto.ProductFilter;
import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.pdpDto.*;
import backend.shoppetproject.repository.ProductRepository;
import backend.shoppetproject.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository,
                          UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Page<ProductDto> searchProducts(ProductFilter filter, String username) {
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
                filter.getType() != null ? filter.getType().name() : null,
                filter.getIsInStock(),
                filter.getMinPrice(),
                filter.getMaxPrice(),
                pageable
        );

        Optional<UserEntity> user = userRepository.findByUserName(username);

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

    public ProductPage getProductPage(Long id) {

        BuyPart buyPart = new BuyPart();
        FeedbackPart feedbackPart = new FeedbackPart();
        InfoPart infoPart = new InfoPart();
        PhotoPart photoPart = new PhotoPart();
        List<SimilarProduct> similarProducts = new ArrayList<>();

        ProductPage productPage = new ProductPage(photoPart,
                infoPart,
                buyPart,
                feedbackPart,
                similarProducts);

        return productPage;
    }
}
