package com.pizzaapp.service;

import com.pizzaapp.dto.AuthResponse;
import com.pizzaapp.dto.LoginRequest;
import com.pizzaapp.dto.RegisterRequest;
import com.pizzaapp.entity.Role;
import com.pizzaapp.entity.User;
import com.pizzaapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public Map<String, String> register(RegisterRequest request) {
        if (users.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered");
        }
        users.save(User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .role(Role.USER)
                .build());
        return Map.of("message", "User registered successfully");
    }

    public AuthResponse login(LoginRequest request) {
        User user = users.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        return new AuthResponse(jwtService.generate(user), user.getRole().name(), user.getName());
    }
}
