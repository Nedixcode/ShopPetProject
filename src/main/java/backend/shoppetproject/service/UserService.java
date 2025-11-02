package backend.shoppetproject.service;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.BasketEntity;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.repository.BasketRepository;
import backend.shoppetproject.repository.ProductRepository;
import backend.shoppetproject.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final BasketRepository basketRepository;

    public UserService(ProductRepository productRepository, UserRepository userRepository, BasketRepository basketRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.basketRepository = basketRepository;
    }

    public List<ProductDto> getProductInBasket(Principal principal) {
        UserEntity user = userRepository.findByUserName(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("пользователь не найден"));

        BasketEntity basket = basketRepository.findByUserId(user.getId())
                .orElseThrow(() -> new EntityNotFoundException(("Корзина у пользователя не найдена")));

        return basket.getProductList().stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDto addProductToBasket(Long id, Principal principal) {
        ProductEntity productToAdd = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Такой товар не найден"));

        UserEntity user = userRepository.findByUserName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Пользователь не найден"));

        BasketEntity basket = basketRepository.findByUserId(user.getId())
                .orElseThrow(() -> new EntityNotFoundException(("Корзина у пользователя не найдена")));

        if (!basket.getProductList().contains(productToAdd)) {
            basket.getProductList().add(productToAdd);
        }
        basketRepository.save(basket);

        return new ProductDto(productToAdd);
    }

    @Transactional
    public ProductDto deleteProductFromBasket(Long id, Principal principal) {
        ProductEntity productToDelete = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Такой товар не найден"));

        UserEntity user = userRepository.findByUserName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Пользователь не найден"));

        BasketEntity basket = basketRepository.findByUserId(user.getId())
                .orElseThrow(() -> new EntityNotFoundException(("Корзина у пользователя не найдена")));

        basket.getProductList().remove(productToDelete);
        basketRepository.save(basket);

        return new ProductDto(productToDelete);
    }
}