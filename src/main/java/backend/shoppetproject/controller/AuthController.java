package backend.shoppetproject.controller;

import backend.shoppetproject.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
