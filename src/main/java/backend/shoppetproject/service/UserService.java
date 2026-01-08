package backend.shoppetproject.service;

import backend.shoppetproject.dto.BasketItemDto;
import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.*;
import backend.shoppetproject.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final BasketRepository basketRepository;
    private final BasketItemRepository basketItemRepository;

    public UserService(ProductRepository productRepository,
                       UserRepository userRepository,
                       BasketRepository basketRepository,
                       BasketItemRepository basketItemRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.basketRepository = basketRepository;
        this.basketItemRepository = basketItemRepository;
    }

    public List<BasketItemDto> getProductsInBasket(Principal principal) {
        UserEntity user = userRepository.findByUserName(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("пользователь не найден"));

        BasketEntity basket = basketRepository.findByUserId(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Корзина не найдена"));

        List<BasketItemEntity> basketItemList = basketItemRepository.findByBasket(basket);

        if (basketItemList.isEmpty()) {
            return List.of();
        }

        return basketItemList.stream().map(BasketItemDto::new).toList();
    }

    @Transactional
    public BasketItemDto addProductToBasket(Long productId, Principal principal) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Товар не найден"));

        UserEntity user = userRepository.findByUserName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Пользователь не найден"));

        BasketEntity basket = basketRepository.findByUserId(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Корзина не найдена"));

        BasketItemEntity basketItem = basketItemRepository.findByBasketAndProduct(basket, product)
                .orElseGet(() -> {
                    BasketItemEntity newBasketItem = new BasketItemEntity();
                    newBasketItem.setBasket(basket);
                    newBasketItem.setProduct(product);
                    newBasketItem.setQuantity(1);
                    basket.getBasketItems().add(newBasketItem);
                    return newBasketItem;
                });

        basketItem.setQuantity(basketItem.getQuantity() + 1);
        basketItemRepository.save(basketItem);

        return new BasketItemDto(basketItem);
    }

    @Transactional
    public List<BasketItemDto> deleteProductsFromBasket(List<Long> productIds, Principal principal) {
        UserEntity user = userRepository.findByUserName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Пользователь не найден"));

        BasketEntity basket = basketRepository.findByUserId(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Корзина не найдена"));

        return productIds.stream().map(productId -> {
            ProductEntity product = productRepository.findById(productId)
                    .orElseThrow(() -> new EntityNotFoundException("Товар не найден"));

            BasketItemEntity basketItem = basketItemRepository.findByBasketAndProduct(basket, product)
                    .orElseThrow(() -> new EntityNotFoundException("Товар не найден в корзине"));

            if (basketItem.getQuantity() > 1) {
                basketItem.setQuantity(basketItem.getQuantity() - 1);
                basketItemRepository.save(basketItem);
            } else {
                basketItemRepository.delete(basketItem);
            }

            return new BasketItemDto(basketItem);
        }).toList();
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
