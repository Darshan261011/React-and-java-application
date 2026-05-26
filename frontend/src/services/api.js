import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getAllPizzas = () => API.get("/pizzas");
export const getPizzaById = (id) => API.get(`/pizzas/${id}`);
export const searchPizzas = (keyword) => API.get(`/pizzas/search?keyword=${keyword}`);
export const getPizzasByCategory = (category) => API.get(`/pizzas/category/${category}`);
export const placeOrder = (data) => API.post("/orders", data);
export const getMyOrders = () => API.get("/orders/my");
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const getAdminOrders = () => API.get("/admin/orders");
export const addPizza = (data) => API.post("/admin/pizzas", data);
export const updatePizza = (id, data) => API.put(`/admin/pizzas/${id}`, data);
export const deletePizza = (id) => API.delete(`/admin/pizzas/${id}`);

export default API;
