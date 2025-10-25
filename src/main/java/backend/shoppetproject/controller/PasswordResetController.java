package backend.shoppetproject.controller;

import backend.shoppetproject.dto.PasswordResetRequest;
import backend.shoppetproject.service.EmailService;
import backend.shoppetproject.service.PasswordResetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class PasswordResetController {

    private final PasswordResetService resetService;

    private final EmailService emailService;

    public PasswordResetController(PasswordResetService resetService, EmailService emailService) {
        this.resetService = resetService;
        this.emailService = emailService;
    }

    @PostMapping("/reset-password-request")
    public ResponseEntity<?> requestReset(@RequestParam String email) {
        String token = resetService.createToken(email);
        emailService.sendResetToken(email, token);
        return ResponseEntity.ok("Если email зарегистрирован, письмо отправлено");
    }

    @PostMapping("/verify-reset-code")
    public ResponseEntity<?> verify(@RequestParam String token) {
        boolean valid = resetService.verifyToken(token);
        return valid ? ResponseEntity.ok("Код подтверждён") : ResponseEntity.badRequest().body("Недействительный код");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> reset(@RequestBody PasswordResetRequest request) {
        resetService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok("Пароль обновлён");
    }
}

