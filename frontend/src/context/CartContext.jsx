import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));

  const sync = (next) => {
    setItems(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const add = (pizza) => {
    const existing = items.find((item) => item.id === pizza.id);
    if (existing) {
      sync(items.map((item) => (item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      sync([...items, { ...pizza, quantity: 1 }]);
    }
  };

  const update = (id, quantity) => {
    if (quantity <= 0) {
      remove(id);
      return;
    }
    sync(items.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const remove = (id) => sync(items.filter((item) => item.id !== id));
  const clear = () => sync([]);

  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(() => ({ items, add, update, remove, clear, total, count }), [items, total, count]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
