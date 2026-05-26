package com.pizzaapp;

import com.pizzaapp.entity.Pizza;
import com.pizzaapp.entity.Role;
import com.pizzaapp.entity.User;
import com.pizzaapp.repository.PizzaRepository;
import com.pizzaapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class PizzaApplication {

    public static void main(String[] args) {
        SpringApplication.run(PizzaApplication.class, args);
    }

    @Bean
    CommandLineRunner seedData(UserRepository users, PizzaRepository pizzas, PasswordEncoder encoder) {
        return args -> {
            if (users.count() == 0) {
                users.save(User.builder().name("Admin").email("admin@pizza.com")
                        .password(encoder.encode("admin123")).role(Role.ADMIN).build());
                users.save(User.builder().name("Gagan").email("user@pizza.com")
                        .password(encoder.encode("user123")).role(Role.USER).build());
            }
            if (pizzas.count() == 0) {
                pizzas.saveAll(List.of(
                        pizza("Margherita", "Classic tomato, mozzarella and fragrant basil.", "Veg", "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=900&q=80", 249, 4.7),
                        pizza("Farmhouse", "Garden vegetables, olives and golden mozzarella.", "Veg", "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80", 349, 4.8),
                        pizza("Peppy Paneer", "Paneer tikka, peppers and a smoky masala sauce.", "Spicy", "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80", 379, 4.6),
                        pizza("Cheese Burst", "Molten cheese center with extra mozzarella on top.", "CheeseBurst", "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80", 429, 4.9),
                        pizza("Chicken Supreme", "Roasted chicken, onion, jalapeno and cheese.", "NonVeg", "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80", 449, 4.7),
                        pizza("Spicy Chicken", "Fiery chicken chunks with chili flakes and herbs.", "Spicy", "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80", 469, 4.5),
                        pizza("Veggie Paradise", "Corn, capsicum, onion and tomato on a soft crust.", "Veg", "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=900&q=80", 329, 4.4),
                        pizza("Paneer Makhani", "Creamy makhani sauce, paneer and fresh coriander.", "Veg", "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80", 399, 4.8),
                        pizza("Mexican Green Wave", "Crunchy vegetables, paprika and Mexican herbs.", "Combo", "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=900&q=80", 359, 4.6),
                        pizza("Double Cheese", "Two cheese layers with a buttery hand-tossed base.", "CheeseBurst", "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=900&q=80", 389, 4.9)
                ));
            }
        };
    }

    private Pizza pizza(String name, String description, String category, String imageUrl, int price, double rating) {
        return Pizza.builder()
                .name(name)
                .description(description)
                .category(category)
                .imageUrl(imageUrl)
                .price(BigDecimal.valueOf(price))
                .rating(rating)
                .available(true)
                .build();
    }
}
