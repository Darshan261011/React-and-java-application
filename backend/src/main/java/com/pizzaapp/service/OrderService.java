package com.pizzaapp.service;

import com.pizzaapp.dto.OrderRequest;
import com.pizzaapp.dto.OrderResponse;
import com.pizzaapp.entity.Order;
import com.pizzaapp.entity.OrderItem;
import com.pizzaapp.entity.Pizza;
import com.pizzaapp.entity.User;
import com.pizzaapp.repository.OrderRepository;
import com.pizzaapp.repository.PizzaRepository;
import com.pizzaapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orders;
    private final PizzaRepository pizzas;
    private final UserRepository users;

    public OrderResponse place(OrderRequest request) {
        User user = currentUser();
        Order order = Order.builder()
                .customerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .paymentMode(request.getPaymentMode())
                .status("CONFIRMED")
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        BigDecimal total = BigDecimal.ZERO;
        for (var itemRequest : request.getItems()) {
            Pizza pizza = pizzas.findById(itemRequest.getPizzaId())
                    .orElseThrow(() -> new IllegalArgumentException("Pizza not found"));
            BigDecimal line = pizza.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            total = total.add(line);
            order.getItems().add(OrderItem.builder()
                    .order(order)
                    .pizza(pizza)
                    .quantity(itemRequest.getQuantity())
                    .price(pizza.getPrice())
                    .build());
        }
        order.setTotalAmount(total);
        Order saved = orders.save(order);
        return new OrderResponse(saved.getId(), "Order placed successfully", saved.getStatus(), saved.getTotalAmount());
    }

    public List<Order> myOrders() {
        return orders.findByUserOrderByCreatedAtDesc(currentUser());
    }

    public Order byId(Long id) {
        Order order = orders.findById(id).orElseThrow(() -> new IllegalArgumentException("Order not found"));
        User user = currentUser();
        if (!order.getUser().getId().equals(user.getId()) && user.getRole().name().equals("USER")) {
            throw new IllegalArgumentException("Order not found");
        }
        return order;
    }

    public List<Order> all() {
        return orders.findAllByOrderByCreatedAtDesc();
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return users.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
