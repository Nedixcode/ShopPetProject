package backend.shoppetproject.controller;

import backend.shoppetproject.service.OtpService;
import backend.shoppetproject.service.SmsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class SmsAuthController {

    private final OtpService otpService;
    private final SmsService smsService;

    public SmsAuthController(OtpService otpService, SmsService smsService) {
        this.otpService = otpService;
        this.smsService = smsService;
    }

//    @PostMapping("/send-otp")
//    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> payload) {
//        String phone = payload.get("phoneNumber");
//        String otp = otpService.generateOtp(phone);
//        smsService.sendSms(phone, "Ваш код: " + otp);
//        return ResponseEntity.ok("OTP отправлен");
//    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> payload) {
        String phone = payload.get("phoneNumber");
        String otp = payload.get("otp");

        if (otpService.verifyOtp(phone, otp)) {
            otpService.clearOtp(phone);
            return ResponseEntity.ok("Успешная авторизация");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неверный код");
        }
    }
}

