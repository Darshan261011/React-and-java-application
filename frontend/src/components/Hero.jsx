import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="section grid min-h-[calc(100vh-5rem)] items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-orange-700 shadow-lg dark:bg-white/10 dark:text-orange-100">
          <Sparkles size={16} /> Oven-fresh in every bite
        </div>
        <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
          Hot, Fresh & Cheesy Pizza Delivered Fast
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-650 dark:text-orange-100/75">
          Order your favorite pizza with fresh ingredients, smooth checkout and quick delivery.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/menu" className="btn-primary">Order Now <ArrowRight size={18} /></Link>
          <Link to="/menu" className="btn-soft">View Menu</Link>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <motion.img
          animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="mx-auto aspect-square w-full max-w-xl rounded-full object-cover shadow-glow"
          src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1100&q=85"
          alt="Fresh pizza"
        />
        <div className="absolute bottom-8 left-0 rounded-3xl bg-white/85 p-5 shadow-xl backdrop-blur dark:bg-black/45">
          <p className="text-sm font-bold text-stone-500 dark:text-orange-100/70">Delivery ETA</p>
          <p className="text-2xl font-black">28 min</p>
        </div>
      </motion.div>
    </section>
  );
}
