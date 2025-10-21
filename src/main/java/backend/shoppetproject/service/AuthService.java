package backend.shoppetproject.service;

import backend.shoppetproject.dto.RegisterRequest;
import backend.shoppetproject.entity.RoleEntity;
import backend.shoppetproject.entity.UserEntity;
import backend.shoppetproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public void getData(RegisterRequest request, RoleEntity adminRole) {
        UserEntity user = new UserEntity();
        user.setUserName(request.getUserName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRoles(Set.of(adminRole));

        userRepository.save(user);
    }
}
