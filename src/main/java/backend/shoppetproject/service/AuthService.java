package backend.shoppetproject.service;

import backend.shoppetproject.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean authenticate(String firstName, String password) {
        return userRepository.findByFirstNameAndPassword(firstName, password).isPresent();
    }
}
