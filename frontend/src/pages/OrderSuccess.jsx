import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccess() {
  const { state } = useLocation();
  return (
    <main className="section grid min-h-[calc(100vh-5rem)] place-items-center py-10">
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="glass max-w-xl rounded-3xl p-8 text-center">
        <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          <CheckCircle2 className="mx-auto text-green-500" size={74} />
        </motion.div>
        <h1 className="mt-5 text-4xl font-black">Order confirmed</h1>
        <div className="mt-6 grid gap-3 rounded-3xl bg-white/70 p-5 text-left dark:bg-white/10">
          <p><strong>Order ID:</strong> #{state?.orderId || "NEW"}</p>
          <p><strong>Total:</strong> ₹{Number(state?.totalAmount || 0).toFixed(0)}</p>
          <p><strong>Payment:</strong> {state?.paymentMode || "COD"}</p>
          <p><strong>ETA:</strong> 30-35 minutes</p>
        </div>
        <Link className="btn-primary mt-6" to="/menu">Continue shopping</Link>
      </motion.div>
    </main>
  );
}
