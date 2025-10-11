package backend.shoppetproject.controller;

import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.repository.UserRepository;
import backend.shoppetproject.service.AuthService;
import backend.shoppetproject.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public boolean login(@RequestBody Map<String, String> payload) {
        String firstName = payload.get("firstName");
        String password = payload.get("password");

        return authService.authenticate(firstName, password);
    }
}
