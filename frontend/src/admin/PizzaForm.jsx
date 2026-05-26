import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPizza, getPizzaById, updatePizza } from "../services/api";

const empty = { name: "", description: "", price: "", imageUrl: "", category: "Veg", available: true, rating: 4.5 };

export default function PizzaForm({ mode }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit") {
      getPizzaById(id).then(({ data }) => setForm(data));
    }
  }, [id, mode]);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const payload = { ...form, price: Number(form.price), rating: Number(form.rating) };
      if (mode === "edit") await updatePizza(id, payload);
      else await addPizza(payload);
      navigate("/admin/pizzas");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save pizza");
    }
  };

  return (
    <main className="section py-10">
      <form onSubmit={submit} className="glass mx-auto grid max-w-3xl gap-4 rounded-3xl p-6">
        <h1 className="text-4xl font-black">{mode === "edit" ? "Edit pizza" : "Add pizza"}</h1>
        <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <textarea className="input min-h-28" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="input" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <input className="input" type="number" step="0.1" placeholder="Rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
        </div>
        <input className="input" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {["Veg", "NonVeg", "CheeseBurst", "Combo", "Spicy"].map((item) => <option key={item}>{item}</option>)}
        </select>
        <label className="flex items-center gap-3 font-bold"><input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} /> Available</label>
        {error && <p className="rounded-2xl bg-red-100 p-3 font-bold text-red-700">{error}</p>}
        <button className="btn-primary">{mode === "edit" ? "Update pizza" : "Create pizza"}</button>
      </form>
    </main>
  );
}
