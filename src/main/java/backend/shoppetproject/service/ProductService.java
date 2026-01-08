package backend.shoppetproject.service;

import backend.shoppetproject.dto.FilterDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<ProductEntity> searchProducts(FilterDto filter) {
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

        return productRepository.searchProducts(
                filter.getQuery(),
                filter.getType(),
                filter.getIsInStock(),
                filter.getMinPrice(),
                filter.getMaxPrice(),
                pageable
        );
    }
}
