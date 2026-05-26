import { useEffect, useState } from "react";
import { getAdminOrders } from "../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { getAdminOrders().then(({ data }) => setOrders(data)); }, []);

  return (
    <main className="section py-10">
      <h1 className="mb-8 text-4xl font-black">All orders</h1>
      <div className="glass overflow-x-auto rounded-3xl p-4">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="table-head"><tr><th className="p-3">ID</th><th className="p-3">Customer</th><th className="p-3">Phone</th><th className="p-3">Address</th><th className="p-3">Payment</th><th className="p-3">Total</th><th className="p-3">Status</th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-orange-100/70 dark:border-white/10">
                <td className="p-3 font-bold">#{order.id}</td><td className="p-3">{order.customerName}</td><td className="p-3">{order.phoneNumber}</td><td className="p-3">{order.address}</td><td className="p-3">{order.paymentMode}</td><td className="p-3">₹{Number(order.totalAmount).toFixed(0)}</td><td className="p-3">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
