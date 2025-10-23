package backend.shoppetproject.controller;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.BasketEntity;
import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.repository.BasketRepository;
import backend.shoppetproject.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/basket")
public class BasketController {

    private final BasketRepository basketRepository;

    private final UserRepository userRepository;

    public BasketController(BasketRepository basketRepository, UserRepository userRepository) {
        this.basketRepository = basketRepository;
        this.userRepository = userRepository;
    }

    private static final Logger logger = LoggerFactory.getLogger(BasketController.class);

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getProductsInBasket(Principal principal) {
        logger.info("вызвался метод getProductsInBasket");

        UserEntity user = userRepository.findByUserName(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("пользователь не найден"));

        BasketEntity basket = basketRepository.findByUserId(user.getId());

        List<ProductDto> dtoList = basket.getProductList().stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }
}
