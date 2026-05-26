import { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyOrders().then(({ data }) => setOrders(data)).catch(() => setError("Unable to load orders."));
  }, []);

  return (
    <main className="section py-10">
      <h1 className="mb-8 text-4xl font-black">My orders</h1>
      {error && <p className="mb-4 rounded-2xl bg-red-100 p-3 font-bold text-red-700">{error}</p>}
      <div className="grid gap-4">
        {orders.map((order) => (
          <article key={order.id} className="glass rounded-3xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-black">Order #{order.id}</h2>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-black text-green-700">{order.status}</span>
            </div>
            <p className="mt-2 text-stone-600 dark:text-orange-100/70">₹{Number(order.totalAmount).toFixed(0)} via {order.paymentMode}</p>
            <p className="mt-1 text-sm text-stone-500">{new Date(order.createdAt).toLocaleString()}</p>
          </article>
        ))}
        {orders.length === 0 && <div className="glass rounded-3xl p-10 text-center font-bold">No orders yet.</div>}
      </div>
    </main>
  );
}
