package backend.shoppetproject.service;

import backend.shoppetproject.entity.PasswordResetToken;
import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.repository.PasswordResetTokenRepository;
import backend.shoppetproject.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Random;

@Service
public class PasswordResetService {

    private final PasswordResetTokenRepository tokenRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public PasswordResetService(PasswordResetTokenRepository tokenRepo, UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.tokenRepo = tokenRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public String createToken(String email) {
        UserEntity user = userRepo.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Пользователь с таким email не найден"));

        String token = String.format("%06d", new Random().nextInt(1000000));

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiresAt(LocalDateTime.now().plusMinutes(15));

        tokenRepo.save(resetToken);
        return token;
    }

    public void verifyToken(String token) {
        PasswordResetToken tokenToCheck = tokenRepo.findByToken(token).orElse(null);

        if (tokenToCheck == null || tokenToCheck.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Невалидный токен");
        }
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken tokenToGetUser = tokenRepo.findByToken(token).orElseThrow();
        UserEntity user = tokenToGetUser.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));

        userRepo.save(user);
        tokenRepo.delete(tokenToGetUser);
    }
}
