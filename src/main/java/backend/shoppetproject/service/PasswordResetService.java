package backend.shoppetproject.service;

import backend.shoppetproject.entity.PasswordResetToken;
import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.repository.PasswordResetTokenRepository;
import backend.shoppetproject.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    private final PasswordResetTokenRepository tokenRepo;

    private final UserRepository userRepo;

    public PasswordResetService(PasswordResetTokenRepository tokenRepo, UserRepository userRepo) {
        this.tokenRepo = tokenRepo;
        this.userRepo = userRepo;
    }

    public String createToken(String email) {
        UserEntity user = userRepo.findByEmail(email).orElseThrow();
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiresAt(LocalDateTime.now().plusMinutes(15));
        tokenRepo.save(resetToken);
        return token;
    }

    public boolean verifyToken(String token) {
        PasswordResetToken t = tokenRepo.findByToken(token).orElse(null);
        return t != null && t.getExpiresAt().isAfter(LocalDateTime.now());
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken t = tokenRepo.findByToken(token).orElseThrow();
        UserEntity user = t.getUser();
        user.setPassword(new BCryptPasswordEncoder().encode(newPassword));
        userRepo.save(user);
        tokenRepo.delete(t);
    }
}
