import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, total } = useCart();

  if (items.length === 0) {
    return (
      <main className="section grid min-h-[calc(100vh-5rem)] place-items-center py-10">
        <div className="glass max-w-xl rounded-3xl p-10 text-center">
          <ShoppingBag className="mx-auto text-orange-500" size={54} />
          <h1 className="mt-4 text-3xl font-black">Your cart is empty</h1>
          <p className="mt-2 text-stone-600 dark:text-orange-100/70">Add something cheesy from the menu.</p>
          <Link className="btn-primary mt-6" to="/menu">Browse Menu</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section py-10">
      <h1 className="mb-8 text-4xl font-black">Your cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4">
          <AnimatePresence>
            {items.map((item) => <CartItem key={item.id} item={item} />)}
          </AnimatePresence>
        </div>
        <aside className="glass h-fit rounded-3xl p-6">
          <h2 className="text-2xl font-black">Order summary</h2>
          <div className="mt-5 flex justify-between text-stone-600 dark:text-orange-100/70"><span>Subtotal</span><span>₹{total.toFixed(0)}</span></div>
          <div className="mt-3 flex justify-between text-stone-600 dark:text-orange-100/70"><span>Delivery</span><span>₹0</span></div>
          <div className="mt-5 border-t border-orange-100 pt-5 text-2xl font-black dark:border-white/10">₹{total.toFixed(0)}</div>
          <Link className="btn-primary mt-6 w-full" to="/checkout">Checkout</Link>
        </aside>
      </div>
    </main>
  );
}
