import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Clock, ShieldCheck, Truck } from "lucide-react";
import Hero from "../components/Hero";
import PizzaCard from "../components/PizzaCard";
import { getAllPizzas } from "../services/api";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    getAllPizzas().then(({ data }) => setPizzas(data.slice(0, 3))).catch(() => setPizzas([]));
  }, []);

  return (
    <>
      <Hero />
      <section className="section py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-bold text-orange-600">Featured</p>
            <h2 className="text-3xl font-black sm:text-4xl">Chef-loved pizzas</h2>
          </div>
          <Link className="btn-soft" to="/menu">Full Menu</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pizzas.map((pizza) => <PizzaCard key={pizza.id} pizza={pizza} />)}
        </div>
      </section>
      <section className="section grid gap-6 py-12 md:grid-cols-3">
        {[
          [Truck, "Fast delivery", "Fresh from oven to doorstep with tracked prep times."],
          [ShieldCheck, "JWT secure", "Protected user and admin flows with role checks."],
          [Clock, "Smooth checkout", "COD and dummy UPI checkout without payment complexity."]
        ].map(([Icon, title, text]) => (
          <motion.div key={title} whileHover={{ y: -6 }} className="glass rounded-3xl p-6">
            <Icon className="text-orange-500" size={34} />
            <h3 className="mt-4 text-xl font-black">{title}</h3>
            <p className="mt-2 text-stone-600 dark:text-orange-100/70">{text}</p>
          </motion.div>
        ))}
      </section>
      <section className="section py-12">
        <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white shadow-glow md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 font-bold"><BadgeCheck /> Weekend offer</div>
              <h2 className="text-3xl font-black">Buy 2 premium pizzas and unlock a surprise combo deal.</h2>
              <p className="mt-3 text-white/80">Dummy offer UI ready for a future coupon system.</p>
            </div>
            <Link to="/menu" className="btn-soft bg-white text-stone-900">Claim Offer</Link>
          </div>
        </div>
      </section>
    </>
  );
}
