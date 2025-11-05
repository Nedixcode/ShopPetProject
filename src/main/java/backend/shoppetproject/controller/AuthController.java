package backend.shoppetproject.controller;

import backend.shoppetproject.dto.AuthRequestDto;
import backend.shoppetproject.dto.AuthResponseDto;
import backend.shoppetproject.dto.RegisterDto;
import backend.shoppetproject.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto request) {
        logger.info("Вызвался метод login, userName = {}", request.getUserName());

        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/registration")
    public ResponseEntity<Void> registration(@RequestBody RegisterDto request) {
        logger.info("вызвался метод registration, userName = {}", request.getUserName());

        authService.registerUser(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/registration/admin")
    public ResponseEntity<Void> registrationAdmin(@RequestBody RegisterDto request) {
        logger.info("вызвался метод registrationAdmin, userName = {}", request.getUserName());

        authService.registerAdmin(request);
        return ResponseEntity.ok().build();
    }
}