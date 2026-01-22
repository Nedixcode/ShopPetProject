package backend.shoppetproject.service;

import backend.shoppetproject.dto.AuthRequest;
import backend.shoppetproject.dto.AuthResponse;
import backend.shoppetproject.dto.Register;
import backend.shoppetproject.entity.BasketEntity;
import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.enums.Role;
import backend.shoppetproject.repository.BasketRepository;
import backend.shoppetproject.repository.UserRepository;
import backend.shoppetproject.security.JwtUtil;
import jakarta.persistence.EntityExistsException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final BasketRepository basketRepository;

    public AuthService(PasswordEncoder passwordEncoder,
                       UserRepository userRepository,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil,
                       BasketRepository basketRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.basketRepository = basketRepository;
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        return new AuthResponse(token);
    }

    public void registerUser(Register request) {
        register(request, Role.USER);
    }

    public void registerAdmin(Register request) {
        register(request, Role.ADMIN);
    }

    private void register(Register request, Role role) {
        if (userRepository.findByUserName(request.getUserName()).isPresent()) {
            throw new EntityExistsException("Пользователь уже существует");
        }

        createUserToRegister(request, role);
    }

    public void createUserToRegister(Register request, Role role) {
        UserEntity user = new UserEntity();
        user.setUserName(request.getUserName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(role);

        userRepository.save(user);

        BasketEntity basket = new BasketEntity();
        basket.setUser(user);
        basket.setBasketItems(new ArrayList<>());
        basketRepository.save(basket);
    }
}
