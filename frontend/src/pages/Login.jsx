import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "user@pizza.com", password: "user123" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(form);
      navigate(data.role === "ADMIN" ? "/admin" : "/menu");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section grid min-h-[calc(100vh-5rem)] items-center gap-8 py-10 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-bold text-orange-600">Welcome back</p>
        <h1 className="text-5xl font-black">Login for warm slices and faster checkout.</h1>
        <p className="mt-4 text-stone-600 dark:text-orange-100/70">Try admin with admin@pizza.com / admin123.</p>
      </motion.div>
      <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-8">
        <h2 className="mb-6 text-2xl font-black">Login</h2>
        <div className="grid gap-4">
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {error && <p className="rounded-2xl bg-red-100 p-3 text-sm font-bold text-red-700">{error}</p>}
          <button className="btn-primary" disabled={loading}><LogIn size={18} /> {loading ? "Logging in..." : "Login"}</button>
          <Link className="text-center font-bold text-orange-600" to="/register">Create a new account</Link>
        </div>
      </form>
    </main>
  );
}
