package backend.shoppetproject.service;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.repository.BasketItemRepository;
import backend.shoppetproject.repository.BasketRepository;
import backend.shoppetproject.repository.ProductRepository;
import backend.shoppetproject.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.Set;

@Service
public class FavoritesService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public FavoritesService(ProductRepository productRepository,
                         UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public List<ProductDto> getProductsInFavorites(Principal principal) {
        UserEntity user = userRepository.findByUserName(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("пользователь не найден"));

        Set<ProductEntity> productSet = user.getFavoriteProducts();

        return productSet.stream().map(ProductDto::new).toList();
    }

    @Transactional
    public ProductDto addProductToFavorites(Long productId, Principal principal) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Товар не найден"));

        UserEntity user = userRepository.findByUserName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Пользователь не найден"));

        user.getFavoriteProducts().add(product);
        userRepository.save(user);

        return new ProductDto(product);
    }

    @Transactional
    public ProductDto deleteProductFromFavorites(Long productId, Principal principal) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Товар не найден"));

        UserEntity user = userRepository.findByUserName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Пользователь не найден"));

        user.getFavoriteProducts().remove(product);
        userRepository.save(user);

        return new ProductDto(product);
    }
}
