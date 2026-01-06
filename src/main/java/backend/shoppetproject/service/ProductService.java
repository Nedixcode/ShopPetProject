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

    public final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<ProductEntity> searchProducts(FilterDto filter) {

        if (isEmptyFilter(filter)) {
            Sort sort = Sort.by(Sort.Direction.fromString(filter.getSortDirection()), filter.getSortBy());
            Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize(), sort);

            return productRepository.findAll(pageable);
        }

        if (filter.getSortBy() == null) {
            Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize());

            return productRepository.searchProductsByAutoSort(
                    filter.getQuery(),
                    filter.getType(),
                    filter.getIsInStock(),
                    filter.getMinPrice(),
                    filter.getMaxPrice(),
                    pageable
            );
        }

        Sort sort = Sort.by(
                Sort.Direction.fromString(filter.getSortDirection()),
                filter.getSortBy()
        );

        Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize(), sort);

        return productRepository.searchProductsByCustomSort(
                filter.getQuery(),
                filter.getType(),
                filter.getIsInStock(),
                filter.getMinPrice(),
                filter.getMaxPrice(),
                pageable
        );
    }

    public boolean isEmptyFilter(FilterDto filter) {
        return (filter.getQuery() == null || filter.getQuery().isBlank()) &&
                filter.getType() == null &&
                filter.getIsInStock() == null &&
                filter.getMinPrice() == null &&
                filter.getMaxPrice() == null;
    }
}