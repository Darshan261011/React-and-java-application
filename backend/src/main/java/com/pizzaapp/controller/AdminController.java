package com.pizzaapp.controller;

import com.pizzaapp.dto.PizzaRequest;
import com.pizzaapp.entity.Order;
import com.pizzaapp.entity.Pizza;
import com.pizzaapp.service.OrderService;
import com.pizzaapp.service.PizzaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final PizzaService pizzaService;
    private final OrderService orderService;

    @GetMapping("/orders")
    public List<Order> orders() {
        return orderService.all();
    }

    @PostMapping("/pizzas")
    public Pizza addPizza(@Valid @RequestBody PizzaRequest request) {
        return pizzaService.create(request);
    }

    @PutMapping("/pizzas/{id}")
    public Pizza updatePizza(@PathVariable Long id, @Valid @RequestBody PizzaRequest request) {
        return pizzaService.update(id, request);
    }

    @DeleteMapping("/pizzas/{id}")
    public void deletePizza(@PathVariable Long id) {
        pizzaService.delete(id);
    }
}
