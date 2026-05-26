import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await register(form);
      setMessage("Account created. Redirecting to login...");
      setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="section grid min-h-[calc(100vh-5rem)] items-center py-10">
      <form onSubmit={submit} className="glass mx-auto w-full max-w-xl rounded-3xl p-6 md:p-8">
        <p className="font-bold text-orange-600">Join Cheezora</p>
        <h1 className="mb-6 text-3xl font-black">Create your pizza account</h1>
        <div className="grid gap-4">
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password (min 6)" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {message && <p className="rounded-2xl bg-green-100 p-3 text-sm font-bold text-green-700">{message}</p>}
          {error && <p className="rounded-2xl bg-red-100 p-3 text-sm font-bold text-red-700">{error}</p>}
          <button className="btn-primary"><UserPlus size={18} /> Register</button>
          <Link className="text-center font-bold text-orange-600" to="/login">Already have an account?</Link>
        </div>
      </form>
    </main>
  );
}
