import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardList, IndianRupee, Pizza, PlusCircle } from "lucide-react";
import { getAdminOrders, getAllPizzas } from "../services/api";

export default function AdminDashboard() {
  const [pizzas, setPizzas] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Promise.all([getAllPizzas(), getAdminOrders()])
      .then(([pizzaRes, orderRes]) => {
        setPizzas(pizzaRes.data);
        setOrders(orderRes.data);
      })
      .catch(() => {});
  }, []);

  const revenue = useMemo(() => orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0), [orders]);

  return (
    <main className="section py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-bold text-orange-600">Admin</p>
          <h1 className="text-4xl font-black">Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <Link className="btn-soft" to="/admin/pizzas">Manage pizzas</Link>
          <Link className="btn-primary" to="/admin/pizzas/add"><PlusCircle size={18} /> Add pizza</Link>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          [Pizza, "Total pizzas", pizzas.length],
          [ClipboardList, "Total orders", orders.length],
          [IndianRupee, "Total revenue", `₹${revenue.toFixed(0)}`]
        ].map(([Icon, label, value]) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6">
            <Icon className="text-orange-500" size={32} />
            <p className="mt-4 text-sm font-bold text-stone-500 dark:text-orange-100/70">{label}</p>
            <p className="text-3xl font-black">{value}</p>
          </motion.div>
        ))}
      </div>
      <section className="mt-8 glass rounded-3xl p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-black">Latest orders</h2>
          <Link className="font-bold text-orange-600" to="/admin/orders">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] overflow-hidden rounded-2xl text-sm">
            <thead className="table-head"><tr><th className="p-3">ID</th><th className="p-3">Customer</th><th className="p-3">Payment</th><th className="p-3">Total</th><th className="p-3">Status</th></tr></thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-t border-orange-100/70 dark:border-white/10">
                  <td className="p-3 font-bold">#{order.id}</td><td className="p-3">{order.customerName}</td><td className="p-3">{order.paymentMode}</td><td className="p-3">₹{Number(order.totalAmount).toFixed(0)}</td><td className="p-3">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
