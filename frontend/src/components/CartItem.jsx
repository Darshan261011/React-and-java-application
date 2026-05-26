import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const fallbackImage = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80";

export default function CartItem({ item }) {
  const { update, remove } = useCart();
  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:items-center">
      <img
        src={item.imageUrl || fallbackImage}
        alt={item.name}
        className="h-28 w-full rounded-3xl object-cover sm:w-36"
        onError={(event) => {
          event.currentTarget.src = fallbackImage;
        }}
      />
      <div className="flex-1">
        <h3 className="text-xl font-black">{item.name}</h3>
        <p className="text-sm text-stone-600 dark:text-orange-100/70">₹{Number(item.price).toFixed(0)} each</p>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full bg-white/75 p-1 dark:bg-white/10">
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-orange-100 dark:hover:bg-white/10" onClick={() => update(item.id, item.quantity - 1)}><Minus size={16} /></button>
          <span className="w-8 text-center font-black">{item.quantity}</span>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-orange-100 dark:hover:bg-white/10" onClick={() => update(item.id, item.quantity + 1)}><Plus size={16} /></button>
        </div>
        <p className="w-24 text-right text-lg font-black">₹{(Number(item.price) * item.quantity).toFixed(0)}</p>
        <button className="grid h-10 w-10 place-items-center rounded-full bg-red-100 text-red-600" onClick={() => remove(item.id)}><Trash2 size={18} /></button>
      </div>
    </motion.div>
  );
}
