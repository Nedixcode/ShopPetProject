package backend.shoppetproject.controller;

import backend.shoppetproject.dto.PasswordResetRequest;
import backend.shoppetproject.service.EmailService;
import backend.shoppetproject.service.PasswordResetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class PasswordResetController {

    private static final Logger logger = LoggerFactory.getLogger(PasswordResetController.class);

    private final PasswordResetService passwordResetService;

    private final EmailService emailService;

    public PasswordResetController(PasswordResetService resetService, EmailService emailService) {
        this.passwordResetService = resetService;
        this.emailService = emailService;
    }

    @PostMapping("/reset-password-request")
    public ResponseEntity<Void> requestReset(@RequestParam String email) {
        logger.info("вызвался метод requestReset, email = {}", email);

        emailService.sendResetToken(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-reset-code")
    public ResponseEntity<String> verify(@RequestParam String token) {
        logger.info("вызвался метод verify, token = {}", token);

        passwordResetService.verifyToken(token);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody PasswordResetRequest request) {
        logger.info("вызвался метод resetPassword, token = {}", request.getToken());

        passwordResetService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok().build();
    }
}
