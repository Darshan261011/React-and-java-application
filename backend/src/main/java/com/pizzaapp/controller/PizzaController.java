package com.pizzaapp.controller;

import com.pizzaapp.entity.Pizza;
import com.pizzaapp.service.PizzaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pizzas")
@RequiredArgsConstructor
public class PizzaController {
    private final PizzaService pizzaService;

    @GetMapping
    public List<Pizza> all() {
        return pizzaService.all();
    }

    @GetMapping("/{id}")
    public Pizza byId(@PathVariable Long id) {
        return pizzaService.byId(id);
    }

    @GetMapping("/search")
    public List<Pizza> search(@RequestParam String keyword) {
        return pizzaService.search(keyword);
    }

    @GetMapping("/category/{category}")
    public List<Pizza> byCategory(@PathVariable String category) {
        return pizzaService.byCategory(category);
    }
}
