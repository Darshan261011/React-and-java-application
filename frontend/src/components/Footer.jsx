import { Pizza } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-orange-100/70 py-10 dark:border-white/10">
      <div className="section flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 font-black text-xl">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-500 text-white"><Pizza /></span>
          Cheezora Pizza
        </div>
        <p className="text-sm text-stone-600 dark:text-orange-100/70">Fresh pizzas, dummy payments, JWT auth and H2 data.</p>
      </div>
    </footer>
  );
}
