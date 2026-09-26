"use client";

import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function ToastNotification() {
  const { toast, clearToast } = useCart();

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(clearToast, 2600);
    return () => window.clearTimeout(timeoutId);
  }, [toast, clearToast]);

  return (
    <div className={`pointer-events-none fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 transition duration-300 ${toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`} role="status" aria-live="polite">
      <div className="whitespace-nowrap bg-stone-900 px-5 py-3 text-sm font-medium text-white shadow-xl">
        {toast || ""}
      </div>
    </div>
  );
}