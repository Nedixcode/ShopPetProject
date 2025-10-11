package backend.shoppetproject.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {
    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    public String generateOtp(String phoneNumber) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000); // 6-значный код
        otpStorage.put(phoneNumber, otp);
        return otp;
    }

    public boolean verifyOtp(String phoneNumber, String otp) {
        return otp.equals(otpStorage.get(phoneNumber));
    }

    public void clearOtp(String phoneNumber) {
        otpStorage.remove(phoneNumber);
    }
}

