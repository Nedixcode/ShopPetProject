package backend.shoppetproject.service;

import backend.shoppetproject.dto.FilterDto;
import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    public final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<ProductEntity> searchProducts(FilterDto filter) {
        Specification<ProductEntity> spec = Specification.unrestricted();

        if (isEmptyFilter(filter)) {
            Sort sort = Sort.by(Sort.Direction.fromString(filter.getSortDirection()), filter.getSortBy());
            Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize(), sort);

            return productRepository.findAll(pageable);
        }

        if (filter.getQuery() != null && !filter.getQuery().isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.or(
                            cb.like(cb.lower(root.get("name")), "%" + filter.getQuery().toLowerCase() + "%"),
                            cb.like(cb.lower(root.get("description")), "%" + filter.getQuery().toLowerCase() + "%")
                    )
            );
        }

        if (filter.getType() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("type"), filter.getType()));
        }

        if (filter.getIsInStock() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("isInStock"), filter.getIsInStock()));
        }

        if (filter.getMinPrice() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("price"), filter.getMinPrice()));
        }

        if (filter.getMaxPrice() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get("price"), filter.getMaxPrice()));
        }

        Sort sort = Sort.by(Sort.Direction.fromString(filter.getSortDirection()), filter.getSortBy());
        Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize(), sort);

        return productRepository.findAll(spec, pageable);
    }

    public boolean isEmptyFilter(FilterDto filter) {
        return (filter.getQuery() == null || filter.getQuery().isBlank()) &&
                filter.getType() == null &&
                filter.getIsInStock() == null &&
                filter.getMinPrice() == null &&
                filter.getMaxPrice() == null;
    }
}
