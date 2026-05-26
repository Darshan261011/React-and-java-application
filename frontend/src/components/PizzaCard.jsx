import { motion } from "framer-motion";
import { Flame, Leaf, Plus, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

const fallbackImage = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80";

export default function PizzaCard({ pizza }) {
  const { add } = useCart();
  const isVeg = pizza.category?.toLowerCase().includes("veg") && !pizza.category?.toLowerCase().includes("non");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="overflow-hidden rounded-3xl bg-white/85 shadow-xl shadow-orange-950/10 transition dark:bg-white/10"
    >
      <div className="relative">
        <img
          src={pizza.imageUrl || fallbackImage}
          alt={pizza.name}
          className="h-56 w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-stone-900 shadow">
          {isVeg ? <Leaf size={15} className="text-green-600" /> : <Flame size={15} className="text-red-500" />}
          {pizza.category}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black">{pizza.name}</h3>
            <p className="mt-2 line-clamp-2 min-h-[3.5rem] text-sm leading-6 text-stone-600 dark:text-orange-100/70">{pizza.description}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-black text-amber-700">
            <Star size={15} fill="currentColor" /> {pizza.rating}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <p className="text-2xl font-black">₹{Number(pizza.price).toFixed(0)}</p>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => add(pizza)} className="btn-primary px-4 py-2.5">
            <Plus size={18} /> Add
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
