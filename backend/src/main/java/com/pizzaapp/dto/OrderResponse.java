package com.pizzaapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class OrderResponse {
    private Long orderId;
    private String message;
    private String status;
    private BigDecimal totalAmount;
}
