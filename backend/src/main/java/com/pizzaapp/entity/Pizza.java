package com.pizzaapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pizza {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 700)
    private String description;

    private BigDecimal price;

    @Column(length = 1000)
    private String imageUrl;

    private String category;

    private boolean available;

    private double rating;
}
