package backend.shoppetproject.controller;

import backend.shoppetproject.dto.AuthRequest;
import backend.shoppetproject.dto.AuthResponse;
import backend.shoppetproject.dto.RegisterRequest;
import backend.shoppetproject.entity.RoleEntity;
import backend.shoppetproject.repository.RoleRepository;
import backend.shoppetproject.repository.UserRepository;
import backend.shoppetproject.security.JwtUtil;
import backend.shoppetproject.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authManager;

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final AuthService authService;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil, UserRepository userRepository, RoleRepository roleRepository, AuthService authService) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        logger.info("Вызвался метод login, пользователь с именем = {}", request.getUserName());

        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        logger.info(token);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody RegisterRequest request) {

        logger.info("Вызвался метод registration, пользователь с именем = {}", request.getUserName());

        if (userRepository.findByUserName(request.getUserName()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Пользователь уже существует");
        }

        RoleEntity userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Роль USER не найдена"));

        authService.getData(request, userRole);
        return ResponseEntity.ok("Регистрация прошла успешно");
    }

    @PostMapping("/registration/admin")
    public ResponseEntity<?> registrationAdmin(@RequestBody RegisterRequest request) {

        logger.info("Вызвался метод registrationAdmin, пользователь с именем = {}", request.toString());

        if (userRepository.findByUserName(request.getUserName()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Пользователь уже существует");
        }

        RoleEntity adminRole = roleRepository.findByName("ADMIN")
                .orElseThrow(() -> new RuntimeException("Роль ADMIN не найдена"));

        authService.getData(request, adminRole);
        return ResponseEntity.ok("Администратор успешно зарегистрирован");
    }


}

