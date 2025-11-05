package backend.shoppetproject.service;

import backend.shoppetproject.dto.AuthRequestDto;
import backend.shoppetproject.dto.AuthResponseDto;
import backend.shoppetproject.dto.RegisterDto;
import backend.shoppetproject.entity.BasketEntity;
import backend.shoppetproject.entity.RoleEntity;
import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.repository.BasketRepository;
import backend.shoppetproject.repository.RoleRepository;
import backend.shoppetproject.repository.UserRepository;
import backend.shoppetproject.security.JwtUtil;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Set;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final BasketRepository basketRepository;

    public AuthService(PasswordEncoder passwordEncoder,
                       UserRepository userRepository,
                       RoleRepository roleRepository,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil,
                       BasketRepository basketRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.basketRepository = basketRepository;
    }

    public AuthResponseDto login(AuthRequestDto request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        return new AuthResponseDto(token);
    }

    public void registerUser(RegisterDto request) {
        register(request, "USER");
    }

    public void registerAdmin(RegisterDto request) {
        register(request, "ADMIN");
    }

    private void register(RegisterDto request, String roleName) {
        if (userRepository.findByUserName(request.getUserName()).isPresent()) {
            throw new EntityExistsException("Пользователь уже существует");
        }

        RoleEntity role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new EntityNotFoundException("Роль " + roleName + " не найдена"));

        createUserToRegister(request, role);
    }

    public void createUserToRegister(RegisterDto request, RoleEntity role) {
        UserEntity user = new UserEntity();
        user.setUserName(request.getUserName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRoles(Set.of(role));

        userRepository.save(user);

        BasketEntity basket = new BasketEntity();
        basket.setUser(user);
        basket.setBasketItems(new ArrayList<>());
        basketRepository.save(basket);
    }
}
