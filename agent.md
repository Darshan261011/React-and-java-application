# AGENT.md — Premium Online Pizza Restaurant App

## Goal

Build a full-stack online pizza restaurant application with:

- Frontend: React + Vite + Node.js v22.20.0
- Backend: Java 17 + Spring Boot
- Database: H2 in-memory database
- Authentication: JWT Login/Auth
- Roles: User and Admin
- Admin Dashboard: Manage pizzas
- Theme: Dark and Light mode
- Payment: Dummy COD + UPI UI only
- UI: Very attractive, soft, smooth, animated, premium food delivery style

The final app must look modern, premium, smooth, and customer-attractive.

---

# 1. Tech Stack

## Frontend

Use:

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- Lucide React
- Context API or Zustand for state
- LocalStorage for token and cart

## Backend

Use:

- Java 17
- Spring Boot
- Spring Web
- Spring Security
- JWT
- Spring Data JPA
- H2 Database
- Validation
- Lombok

---

# 2. Main Features

## User Features

- Register
- Login
- View pizzas
- Search pizzas
- Filter pizzas by category
- Add pizza to cart
- Update cart quantity
- Checkout
- Dummy payment using COD or UPI
- Place order
- View order success page

## Admin Features

- Admin login
- Admin dashboard
- Add pizza
- Update pizza
- Delete pizza
- View all pizzas
- View all orders

---

# 3. UI Design Requirements

The UI must be:

- Premium
- Soft
- Smooth
- Attractive
- Modern
- Food-friendly
- Animated
- Fully responsive

Use design style similar to modern food delivery apps.

## UI Style

Use:

- Soft rounded cards
- `rounded-3xl`
- `shadow-xl`
- Glassmorphism
- Smooth gradients
- Cream, orange, red, brown colors
- Dark mode and light mode
- Floating pizza images
- Attractive buttons
- Smooth page transitions

Avoid:

- Boring UI
- Plain HTML look
- Harsh colors
- Too many borders
- Crowded design

---

# 4. Theme Requirement

Add Dark and Light theme.

Theme button should be visible in Navbar.

Use:

- Light mode: cream background, dark text
- Dark mode: dark brown/black background, cream text
- Smooth transition between themes

Theme should be stored in localStorage.

---

# 5. Animation Requirements

Use Framer Motion.

Animations required:

- Hero section fade-in
- Pizza image floating animation
- Pizza card slide-up
- Button hover scale
- Page transitions
- Cart item animation
- Admin dashboard card animation
- Success page animation

Example:

```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

Animation should feel smooth and premium, not childish.

---

# 6. Frontend Pages

## Public Pages

Create:

- Home
- Menu
- Login
- Register
- Cart
- Checkout
- OrderSuccess

## User Pages

Create:

- MyOrders

## Admin Pages

Create:

- AdminDashboard
- ManagePizzas
- AddPizza
- EditPizza
- AdminOrders

---

# 7. Home Page

Home page must include:

- Beautiful Navbar
- Hero section
- Animated pizza image
- CTA buttons
- Featured pizzas
- Why Choose Us section
- Offers section
- Customer trust section
- Footer

Hero headline:

Hot, Fresh & Cheesy Pizza Delivered Fast

Hero subtext:

Order your favorite pizza with fresh ingredients, smooth checkout and quick delivery.

Buttons:

- Order Now
- View Menu

---

# 8. Menu Page

Menu page must include:

- Search bar
- Category filters
- Pizza cards
- Add to Cart button
- Price
- Rating UI
- Veg/NonVeg badge
- Smooth hover animation

Categories:

- Veg
- NonVeg
- CheeseBurst
- Combo
- Spicy

---

# 9. Cart Page

Cart page must include:

- Pizza image
- Pizza name
- Price
- Quantity increase/decrease
- Remove item
- Cart total
- Checkout button
- Empty cart UI

---

# 10. Checkout Page

Checkout page must include:

Fields:

- Customer name
- Phone number
- Address
- Payment mode

Payment options:

- COD
- UPI

For UPI, show dummy UI only.

Do not integrate real payment gateway.

---

# 11. Order Success Page

Order success page must include:

- Success animation
- Order ID
- Total amount
- Payment mode
- Estimated delivery time
- Continue shopping button

---

# 12. Admin Dashboard

Admin dashboard must include:

- Total pizzas
- Total orders
- Total revenue
- Latest orders
- Manage pizzas button
- View orders button

Admin UI should look premium and professional.

---

# 13. Frontend Folder Structure

```text
src
|
|-- assets
|
|-- components
|   |-- Navbar.jsx
|   |-- Footer.jsx
|   |-- Hero.jsx
|   |-- PizzaCard.jsx
|   |-- CartItem.jsx
|   |-- ProtectedRoute.jsx
|   |-- AdminRoute.jsx
|   |-- ThemeToggle.jsx
|
|-- context
|   |-- AuthContext.jsx
|   |-- CartContext.jsx
|   |-- ThemeContext.jsx
|
|-- pages
|   |-- Home.jsx
|   |-- Menu.jsx
|   |-- Login.jsx
|   |-- Register.jsx
|   |-- Cart.jsx
|   |-- Checkout.jsx
|   |-- OrderSuccess.jsx
|   |-- MyOrders.jsx
|
|-- admin
|   |-- AdminDashboard.jsx
|   |-- ManagePizzas.jsx
|   |-- AddPizza.jsx
|   |-- EditPizza.jsx
|   |-- AdminOrders.jsx
|
|-- services
|   |-- api.js
|
|-- App.jsx
|-- main.jsx
|-- index.css
```

---

# 14. Backend APIs

## Auth APIs

### Register User

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "Gagan",
  "email": "gagan@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "message": "User registered successfully"
}
```

---

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "gagan@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "jwt-token",
  "role": "USER",
  "name": "Gagan"
}
```

---

# 15. Pizza APIs

### Get All Pizzas

```http
GET /api/pizzas
```

Public API.

---

### Get Pizza By ID

```http
GET /api/pizzas/{id}
```

Public API.

---

### Search Pizza

```http
GET /api/pizzas/search?keyword=cheese
```

Public API.

---

### Filter Pizza By Category

```http
GET /api/pizzas/category/Veg
```

Public API.

---

### Add Pizza

```http
POST /api/admin/pizzas
```

Admin only.

---

### Update Pizza

```http
PUT /api/admin/pizzas/{id}
```

Admin only.

---

### Delete Pizza

```http
DELETE /api/admin/pizzas/{id}
```

Admin only.

---

# 16. Order APIs

### Place Order

```http
POST /api/orders
```

User only.

Request:

```json
{
  "customerName": "Gagan",
  "phoneNumber": "9876543210",
  "address": "Bangalore",
  "paymentMode": "COD",
  "items": [
    {
      "pizzaId": 1,
      "quantity": 2
    }
  ]
}
```

Response:

```json
{
  "orderId": 101,
  "message": "Order placed successfully",
  "status": "CONFIRMED",
  "totalAmount": 598
}
```

---

### Get My Orders

```http
GET /api/orders/my
```

User only.

---

### Get Order By ID

```http
GET /api/orders/{id}
```

User only.

---

### Get All Orders

```http
GET /api/admin/orders
```

Admin only.

---

# 17. Backend Folder Structure

```text
src/main/java/com/pizzaapp
|
|-- config
|   |-- SecurityConfig.java
|   |-- JwtFilter.java
|   |-- CorsConfig.java
|
|-- controller
|   |-- AuthController.java
|   |-- PizzaController.java
|   |-- OrderController.java
|   |-- AdminController.java
|
|-- dto
|   |-- LoginRequest.java
|   |-- RegisterRequest.java
|   |-- AuthResponse.java
|   |-- PizzaRequest.java
|   |-- OrderRequest.java
|   |-- OrderResponse.java
|
|-- entity
|   |-- User.java
|   |-- Pizza.java
|   |-- Order.java
|   |-- OrderItem.java
|
|-- repository
|   |-- UserRepository.java
|   |-- PizzaRepository.java
|   |-- OrderRepository.java
|
|-- service
|   |-- AuthService.java
|   |-- PizzaService.java
|   |-- OrderService.java
|   |-- JwtService.java
|
|-- exception
|   |-- GlobalExceptionHandler.java
|
|-- PizzaApplication.java
```

---

# 18. H2 Database Configuration

Use H2 only.

Do not use MySQL.

Add dependency:

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

---

# 19. application.properties

```properties
spring.application.name=pizza-app

server.port=8080

spring.datasource.url=jdbc:h2:mem:pizzadb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

jwt.secret=change-this-secret-key-for-development-only
jwt.expiration=86400000
```

---

# 20. H2 Console

Access:

```text
http://localhost:8080/h2-console
```

Login:

```text
JDBC URL: jdbc:h2:mem:pizzadb
Username: sa
Password: blank
```

---

# 21. Entities

## User

Fields:

```text
id
name
email
password
role
```

Roles:

```text
USER
ADMIN
```

---

## Pizza

Fields:

```text
id
name
description
price
imageUrl
category
available
rating
```

---

## Order

Fields:

```text
id
customerName
phoneNumber
address
paymentMode
totalAmount
status
createdAt
user
items
```

---

## OrderItem

Fields:

```text
id
pizza
quantity
price
order
```

---

# 22. Seed Data

Create default data using CommandLineRunner.

Seed:

- Admin user
- Normal user
- 8 to 10 pizzas

Default Admin:

```text
Email: admin@pizza.com
Password: admin123
Role: ADMIN
```

Default User:

```text
Email: user@pizza.com
Password: user123
Role: USER
```

Sample pizzas:

```text
Margherita
Farmhouse
Peppy Paneer
Cheese Burst
Chicken Supreme
Spicy Chicken
Veggie Paradise
Paneer Makhani
Mexican Green Wave
Double Cheese
```

---

# 23. JWT Rules

Use JWT authentication.

JWT must include:

- Email
- Role
- Expiration

Frontend must store token in localStorage.

For protected APIs, send:

```http
Authorization: Bearer token
```

Admin routes must allow only ADMIN role.

User routes must allow USER and ADMIN where required.

---

# 24. Security Rules

Public APIs:

```text
/api/auth/**
/api/pizzas/**
/h2-console/**
```

User protected APIs:

```text
/api/orders/**
```

Admin protected APIs:

```text
/api/admin/**
```

Disable CSRF for APIs.

Allow CORS for:

```text
http://localhost:5173
```

---

# 25. Frontend API File

Create:

```text
src/services/api.js
```

Use:

```js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getAllPizzas = () =>
  API.get("/pizzas");

export const getPizzaById = (id) =>
  API.get(`/pizzas/${id}`);

export const searchPizzas = (keyword) =>
  API.get(`/pizzas/search?keyword=${keyword}`);

export const getPizzasByCategory = (category) =>
  API.get(`/pizzas/category/${category}`);

export const placeOrder = (data) =>
  API.post("/orders", data);

export const getMyOrders = () =>
  API.get("/orders/my");

export const getOrderById = (id) =>
  API.get(`/orders/${id}`);

export const getAdminOrders = () =>
  API.get("/admin/orders");

export const addPizza = (data) =>
  API.post("/admin/pizzas", data);

export const updatePizza = (id, data) =>
  API.put(`/admin/pizzas/${id}`, data);

export const deletePizza = (id) =>
  API.delete(`/admin/pizzas/${id}`);

export default API;
```

---

# 26. UI Component Rules

## Pizza Card

Pizza card must include:

- Pizza image
- Name
- Description
- Price
- Category badge
- Rating
- Add to Cart button

Card animation:

- Lift on hover
- Scale slightly
- Shadow increase
- Smooth transition

---

## Navbar

Navbar must include:

- Logo
- Home
- Menu
- Cart
- My Orders
- Login/Logout
- Admin Dashboard if role is ADMIN
- Theme toggle

---

## Button Style

Buttons should use:

- Rounded full
- Gradient background
- Smooth hover scale
- Soft shadow
- Clear text

---

# 27. Dummy Payment UI

Payment options:

- Cash on Delivery
- UPI

For UPI:

Show:

- UPI ID input
- Dummy pay button
- Payment success simulation

Important:

Do not integrate real payment gateway.

After placing order, navigate to success page.

---

# 28. Admin Dashboard UI

Admin dashboard must be attractive.

Show cards:

- Total pizzas
- Total orders
- Total revenue
- Latest order status

Admin should be able to:

- Add pizza
- Edit pizza
- Delete pizza
- View orders

Use table with smooth design.

---

# 29. Error Handling

Backend should return clean error messages.

Examples:

```json
{
  "message": "Invalid email or password"
}
```

```json
{
  "message": "Pizza not found"
}
```

Frontend should show:

- Toast or alert
- Loading state
- Empty state
- Error state

---

# 30. Validation

Validate:

Register:

- Name required
- Email required
- Password minimum 6 characters

Login:

- Email required
- Password required

Pizza:

- Name required
- Price positive
- Category required

Order:

- Customer name required
- Phone number required
- Address required
- At least one item required

---

# 31. Run Commands

## Backend

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## Frontend

```bash
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 32. Final Output Expectations

The final app must provide:

- Premium landing page
- Smooth animated pizza menu
- Search and filter
- Cart system
- Checkout page
- Dummy COD and UPI payment UI
- JWT login and register
- User and Admin roles
- Admin dashboard
- Manage pizzas
- View orders
- H2 database
- Seed data
- Fully working API integration
- Responsive design
- Dark and Light theme

---

# 33. Important Agent Instructions

Build the app completely.

Priority order:

1. Beautiful UI
2. Smooth animations
3. Working JWT auth
4. H2 database setup
5. Clean Spring Boot APIs
6. Admin dashboard
7. Cart and checkout flow
8. Dummy payment UI
9. Responsive design
10. Clean code

Do not create boring UI.

Do not use MySQL.

Do not skip JWT.

Do not skip admin dashboard.

Do not skip dark/light theme.

Do not skip dummy payment.

Make the project beginner-friendly and easy to run.