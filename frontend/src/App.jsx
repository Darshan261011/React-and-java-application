import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./admin/AdminDashboard";
import ManagePizzas from "./admin/ManagePizzas";
import AddPizza from "./admin/AddPizza";
import EditPizza from "./admin/EditPizza";
import AdminOrders from "./admin/AdminOrders";

function Page({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.22 }}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="page-shell">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/menu" element={<Page><Menu /></Page>} />
          <Route path="/login" element={<Page><Login /></Page>} />
          <Route path="/register" element={<Page><Register /></Page>} />
          <Route path="/cart" element={<Page><Cart /></Page>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Page><Checkout /></Page>} />
            <Route path="/order-success" element={<Page><OrderSuccess /></Page>} />
            <Route path="/my-orders" element={<Page><MyOrders /></Page>} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Page><AdminDashboard /></Page>} />
            <Route path="/admin/pizzas" element={<Page><ManagePizzas /></Page>} />
            <Route path="/admin/pizzas/add" element={<Page><AddPizza /></Page>} />
            <Route path="/admin/pizzas/edit/:id" element={<Page><EditPizza /></Page>} />
            <Route path="/admin/orders" element={<Page><AdminOrders /></Page>} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
