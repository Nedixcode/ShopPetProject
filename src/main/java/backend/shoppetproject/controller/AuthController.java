package backend.shoppetproject.controller;

import backend.shoppetproject.dto.AuthRequest;
import backend.shoppetproject.dto.AuthResponse;
import backend.shoppetproject.dto.RegisterRequest;
import backend.shoppetproject.entity.RoleEntity;
import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.repository.RoleRepository;
import backend.shoppetproject.repository.UserRepository;
import backend.shoppetproject.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        logger.info("Вызвался метод login, пользователь с именем = {}", request.getUsername());

        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(token));
    }


    @PostMapping("/registration/")
    public ResponseEntity<?> registration(@RequestBody RegisterRequest request) {

        logger.info("Вызвался метод registration, пользователь с именем = {}", request.getUsername());

        if (userRepository.findByUserName(request.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Пользователь уже существует");
        }

        RoleEntity userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Роль USER не найдена"));

        getData(request, userRole);
        return ResponseEntity.ok("Регистрация прошла успешно");
    }

    @PostMapping("/registration/admin")
    public ResponseEntity<?> registrationAdmin(@RequestBody RegisterRequest request) {

        logger.info("Вызвался метод registrationAdmin, пользователь с именем = {}", request.getUsername());

        if (userRepository.findByUserName(request.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Пользователь уже существует");
        }

        RoleEntity adminRole = roleRepository.findByName("ADMIN")
                .orElseThrow(() -> new RuntimeException("Роль ADMIN не найдена"));

        getData(request, adminRole);
        return ResponseEntity.ok("Администратор успешно зарегистрирован");
    }

    private void getData(@RequestBody RegisterRequest request, RoleEntity adminRole) {
        UserEntity user = new UserEntity();
        user.setUserName(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRoles(Set.of(adminRole));

        userRepository.save(user);
    }
}

