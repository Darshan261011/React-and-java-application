import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { deletePizza, getAllPizzas } from "../services/api";

export default function ManagePizzas() {
  const [pizzas, setPizzas] = useState([]);

  const load = () => getAllPizzas().then(({ data }) => setPizzas(data));
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this pizza?")) return;
    await deletePizza(id);
    load();
  };

  return (
    <main className="section py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-4xl font-black">Manage pizzas</h1>
        <Link className="btn-primary" to="/admin/pizzas/add"><PlusCircle size={18} /> Add</Link>
      </div>
      <div className="glass overflow-x-auto rounded-3xl p-4">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="table-head"><tr><th className="p-3">Pizza</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Rating</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {pizzas.map((pizza) => (
              <tr key={pizza.id} className="border-t border-orange-100/70 dark:border-white/10">
                <td className="flex items-center gap-3 p-3 font-bold"><img className="h-14 w-14 rounded-2xl object-cover" src={pizza.imageUrl} alt="" />{pizza.name}</td>
                <td className="p-3">{pizza.category}</td><td className="p-3">₹{Number(pizza.price).toFixed(0)}</td><td className="p-3">{pizza.rating}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Link className="grid h-10 w-10 place-items-center rounded-full bg-orange-100 text-orange-700" to={`/admin/pizzas/edit/${pizza.id}`}><Edit size={17} /></Link>
                    <button className="grid h-10 w-10 place-items-center rounded-full bg-red-100 text-red-700" onClick={() => remove(pizza.id)}><Trash2 size={17} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
