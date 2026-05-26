import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import PizzaCard from "../components/PizzaCard";
import { getAllPizzas, getPizzasByCategory, searchPizzas } from "../services/api";

const categories = ["All", "Veg", "NonVeg", "CheeseBurst", "Combo", "Spicy"];

export default function Menu() {
  const [pizzas, setPizzas] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const action = query.trim()
      ? searchPizzas(query.trim())
      : category === "All"
        ? getAllPizzas()
        : getPizzasByCategory(category);
    action.then(({ data }) => setPizzas(data)).catch(() => setError("Unable to load pizzas. Start the backend on port 8080.")).finally(() => setLoading(false));
  }, [query, category]);

  const countLabel = useMemo(() => (loading ? "Loading menu..." : `${pizzas.length} pizzas ready`), [loading, pizzas.length]);

  return (
    <main className="section py-10">
      <div className="mb-8">
        <p className="font-bold text-orange-600">Menu</p>
        <h1 className="text-4xl font-black sm:text-5xl">Find your next favorite slice</h1>
      </div>
      <div className="glass mb-8 grid gap-4 rounded-3xl p-4 md:grid-cols-[1fr_auto] md:items-center">
        <label className="relative block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
          <input className="input pl-12" placeholder="Search cheese, paneer, chicken..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${category === item ? "bg-orange-500 text-white" : "bg-white/80 dark:bg-white/10"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="mb-5 text-sm font-bold text-stone-500 dark:text-orange-100/70">{countLabel}</p>
      {error && <div className="mb-5 rounded-2xl bg-red-100 p-4 font-semibold text-red-700">{error}</div>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pizzas.map((pizza) => <PizzaCard key={pizza.id} pizza={pizza} />)}
      </div>
      {!loading && pizzas.length === 0 && <div className="glass rounded-3xl p-10 text-center font-bold">No pizzas found.</div>}
    </main>
  );
}
