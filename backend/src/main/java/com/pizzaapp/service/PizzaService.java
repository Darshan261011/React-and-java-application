package com.pizzaapp.service;

import com.pizzaapp.dto.PizzaRequest;
import com.pizzaapp.entity.Pizza;
import com.pizzaapp.repository.PizzaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PizzaService {
    private final PizzaRepository pizzas;

    public List<Pizza> all() {
        return pizzas.findAll();
    }

    public Pizza byId(Long id) {
        return pizzas.findById(id).orElseThrow(() -> new IllegalArgumentException("Pizza not found"));
    }

    public List<Pizza> search(String keyword) {
        return pizzas.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }

    public List<Pizza> byCategory(String category) {
        return pizzas.findByCategoryIgnoreCase(category);
    }

    public Pizza create(PizzaRequest request) {
        return pizzas.save(apply(new Pizza(), request));
    }

    public Pizza update(Long id, PizzaRequest request) {
        return pizzas.save(apply(byId(id), request));
    }

    public void delete(Long id) {
        pizzas.delete(byId(id));
    }

    private Pizza apply(Pizza pizza, PizzaRequest request) {
        pizza.setName(request.getName());
        pizza.setDescription(request.getDescription());
        pizza.setPrice(request.getPrice());
        pizza.setImageUrl(request.getImageUrl());
        pizza.setCategory(request.getCategory());
        pizza.setAvailable(request.isAvailable());
        pizza.setRating(request.getRating());
        return pizza;
    }
}
