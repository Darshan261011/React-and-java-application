import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, IndianRupee } from "lucide-react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/api";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({ customerName: "", phoneNumber: "", address: "", paymentMode: "COD", upiId: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const payload = {
        customerName: form.customerName,
        phoneNumber: form.phoneNumber,
        address: form.address,
        paymentMode: form.paymentMode,
        items: items.map((item) => ({ pizzaId: item.id, quantity: item.quantity }))
      };
      const { data } = await placeOrder(payload);
      clear();
      navigate("/order-success", { state: { ...data, paymentMode: form.paymentMode } });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to place order. Login before checkout.");
    }
  };

  return (
    <main className="section py-10">
      <h1 className="mb-8 text-4xl font-black">Checkout</h1>
      <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="glass grid gap-4 rounded-3xl p-6">
          <input className="input" placeholder="Customer name" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} required />
          <input className="input" placeholder="Phone number" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} required />
          <textarea className="input min-h-32" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
          <div className="grid gap-3 sm:grid-cols-2">
            {["COD", "UPI"].map((mode) => (
              <button type="button" key={mode} onClick={() => setForm({ ...form, paymentMode: mode })} className={`rounded-3xl p-4 text-left font-black transition ${form.paymentMode === mode ? "bg-orange-500 text-white shadow-glow" : "bg-white/75 dark:bg-white/10"}`}>
                {mode === "COD" ? <IndianRupee /> : <CreditCard />}
                <span className="mt-3 block">{mode === "COD" ? "Cash on Delivery" : "UPI Dummy Pay"}</span>
              </button>
            ))}
          </div>
          {form.paymentMode === "UPI" && (
            <div className="rounded-3xl bg-orange-100/70 p-4 dark:bg-white/10">
              <input className="input" placeholder="yourname@upi" value={form.upiId} onChange={(e) => setForm({ ...form, upiId: e.target.value })} />
              <p className="mt-2 text-sm font-semibold text-stone-600 dark:text-orange-100/70">Dummy UI only. No real payment is processed.</p>
            </div>
          )}
          {error && <p className="rounded-2xl bg-red-100 p-3 text-sm font-bold text-red-700">{error}</p>}
        </div>
        <aside className="glass h-fit rounded-3xl p-6">
          <h2 className="text-2xl font-black">Payable</h2>
          <p className="mt-4 text-4xl font-black">₹{total.toFixed(0)}</p>
          <p className="mt-2 text-sm text-stone-600 dark:text-orange-100/70">{items.length} cart items</p>
          <button className="btn-primary mt-6 w-full" disabled={items.length === 0}>Place Order</button>
        </aside>
      </form>
    </main>
  );
}
