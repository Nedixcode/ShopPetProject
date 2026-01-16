package backend.shoppetproject.service;

import backend.shoppetproject.dto.BasketItemDto;
import backend.shoppetproject.entity.BasketEntity;
import backend.shoppetproject.entity.BasketItemEntity;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.repository.BasketItemRepository;
import backend.shoppetproject.repository.BasketRepository;
import backend.shoppetproject.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;

@Service
public class BasketService {

    private final ProductRepository productRepository;
    private final BasketRepository basketRepository;
    private final BasketItemRepository basketItemRepository;

    public BasketService(ProductRepository productRepository,
                       BasketRepository basketRepository,
                       BasketItemRepository basketItemRepository) {
        this.productRepository = productRepository;
        this.basketRepository = basketRepository;
        this.basketItemRepository = basketItemRepository;
    }

    public List<BasketItemDto> getProductsInBasket(Principal principal) {
        BasketEntity basket = basketRepository.findByUser_UserName(principal.getName())
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

        BasketEntity basket = basketRepository.findByUser_UserName(principal.getName())
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

        basketItemRepository.save(basketItem);

        return new BasketItemDto(basketItem);
    }

    @Transactional
    public List<BasketItemDto> deleteProductsFromBasket(List<Long> productIds, Principal principal) {
        BasketEntity basket = basketRepository.findByUser_UserName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Корзина не найдена"));

        productIds.forEach(productId -> {
            ProductEntity product = productRepository.findById(productId)
                    .orElseThrow(() -> new EntityNotFoundException("Товар не найден"));

            BasketItemEntity basketItem = basketItemRepository.findByBasketAndProduct(basket, product)
                    .orElseThrow(() -> new EntityNotFoundException("Товар не найден в корзине"));

            basketItemRepository.delete(basketItem);
        });

        return basketItemRepository.findByBasket(basket)
                .stream()
                .map(BasketItemDto::new)
                .toList();
    }

//    public BasketItemDto increaseCountOfProduct() {
//    }
}
