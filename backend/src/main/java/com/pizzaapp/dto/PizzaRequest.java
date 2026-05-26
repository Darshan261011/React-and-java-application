package com.pizzaapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PizzaRequest {
    @NotBlank
    private String name;
    private String description;

    @Positive
    private BigDecimal price;

    private String imageUrl;

    @NotBlank
    private String category;

    private boolean available = true;
    private double rating = 4.5;
}
