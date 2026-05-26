package com.pizzaapp.controller;

import com.pizzaapp.dto.OrderRequest;
import com.pizzaapp.dto.OrderResponse;
import com.pizzaapp.entity.Order;
import com.pizzaapp.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public OrderResponse place(@Valid @RequestBody OrderRequest request) {
        return orderService.place(request);
    }

    @GetMapping("/my")
    public List<Order> myOrders() {
        return orderService.myOrders();
    }

    @GetMapping("/{id}")
    public Order byId(@PathVariable Long id) {
        return orderService.byId(id);
    }
}
