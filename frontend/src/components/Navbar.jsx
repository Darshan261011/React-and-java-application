import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu as MenuIcon, Pizza, ShoppingCart, UserCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ThemeToggle from "./ThemeToggle";

const navClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-orange-500 text-white" : "hover:bg-orange-100 dark:hover:bg-white/10"}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthed, role, name, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate("/");
  };

  const links = (
    <>
      <NavLink className={navClass} to="/">Home</NavLink>
      <NavLink className={navClass} to="/menu">Menu</NavLink>
      <NavLink className={navClass} to="/cart">Cart</NavLink>
      {isAuthed && <NavLink className={navClass} to="/my-orders">My Orders</NavLink>}
      {role === "ADMIN" && <NavLink className={navClass} to="/admin">Admin</NavLink>}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-orange-100/60 bg-[#fff7ed]/80 backdrop-blur-2xl dark:border-white/10 dark:bg-[#140f0c]/75">
      <nav className="section flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-black text-xl">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-glow">
            <Pizza />
          </span>
          Cheezora
        </Link>
        <div className="hidden items-center gap-2 lg:flex">{links}</div>
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/cart" className="relative grid h-11 w-11 place-items-center rounded-full bg-white/75 shadow-lg dark:bg-white/10">
            <ShoppingCart size={20} />
            {count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-2 text-xs font-bold text-white">{count}</span>}
          </Link>
          <ThemeToggle />
          {isAuthed ? (
            <button onClick={doLogout} className="btn-soft py-2.5"><LogOut size={18} /> {name}</button>
          ) : (
            <Link className="btn-primary py-2.5" to="/login"><UserCircle size={18} /> Login</Link>
          )}
        </div>
        <button onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full bg-white/75 shadow lg:hidden dark:bg-white/10">
          <MenuIcon />
        </button>
      </nav>
      {open && (
        <div className="section flex flex-col gap-2 pb-5 lg:hidden">
          {links}
          <div className="flex items-center gap-3 pt-2">
            <ThemeToggle />
            {isAuthed ? <button onClick={doLogout} className="btn-soft py-2.5"><LogOut size={18} /> Logout</button> : <Link className="btn-primary py-2.5" to="/login">Login</Link>}
          </div>
        </div>
      )}
    </header>
  );
}
