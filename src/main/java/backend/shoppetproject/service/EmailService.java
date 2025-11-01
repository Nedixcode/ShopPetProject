package backend.shoppetproject.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final PasswordResetService passwordResetService;
    private final JavaMailSender mailSender;

    public EmailService(PasswordResetService passwordResetService, JavaMailSender mailSender) {
        this.passwordResetService = passwordResetService;
        this.mailSender = mailSender;
    }

    public void sendResetToken(String email) {
        String token = passwordResetService.createToken(email);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Восстановление пароля");
        message.setText("Ваш код для сброса пароля: " + token);
        mailSender.send(message);
    }
}
