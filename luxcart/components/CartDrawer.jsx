"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16m-10 4v6m4-6v6M9 7V4h6v3m-9 0 1 13h10l1-13" />
    </svg>
  );
}

function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartTotal
  } = useCart();

  useEffect(() => {
    if (!isCartOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") closeCart();
    }

    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-stone-950/40 transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        aria-label="Shopping cart"
        aria-hidden={!isCartOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-stone-200 px-5 py-5 sm:px-7">
          <h2 className="font-serif text-2xl text-stone-900">Shopping Cart ({getCartCount()} {getCartCount() === 1 ? "item" : "items"})</h2>
          <button type="button" onClick={closeCart} aria-label="Close cart" className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-100 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-900">
            <CloseIcon />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-3xl text-stone-400" aria-hidden="true">🛍</div>
            <h3 className="mt-6 font-serif text-2xl text-stone-900">Your cart is empty</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-stone-500">Find something considered for your next everyday edit.</p>
            <Link href="/shop" onClick={closeCart} className="mt-7 bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              <div className="space-y-6">
                {cart.map((item) => (
                  <article key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="h-24 w-20 shrink-0 object-cover bg-stone-100" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link href={`/product/${item.id}`} onClick={closeCart} className="line-clamp-2 text-sm font-medium text-stone-900 hover:text-stone-600">{item.name}</Link>
                          <p className="mt-1 text-xs text-stone-500">Size: {item.selectedSize}</p>
                        </div>
                        <button type="button" onClick={() => removeFromCart(item.id, item.selectedSize)} aria-label={`Remove ${item.name}`} className="shrink-0 p-1 text-stone-400 transition hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-stone-900"><TrashIcon /></button>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex h-8 items-center border border-stone-300">
                          <button type="button" onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} disabled={item.quantity <= 1} aria-label={`Decrease ${item.name} quantity`} className="flex h-full w-8 items-center justify-center text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40">−</button>
                          <span className="w-8 text-center text-xs text-stone-900">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`} className="flex h-full w-8 items-center justify-center text-stone-600 transition hover:bg-stone-100">+</button>
                        </div>
                        <p className="text-sm font-semibold text-stone-900">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <footer className="border-t border-stone-200 px-5 pb-6 pt-5 sm:px-7">
              <div className="flex items-center justify-between text-base font-semibold text-stone-900"><span>Subtotal</span><span>{formatPrice(getCartTotal())}</span></div>
              <p className="mt-2 text-xs text-stone-500">Free Shipping eligible</p>
              <div className="mt-5 grid gap-3">
                <Link href="/cart" onClick={closeCart} className="flex items-center justify-center border border-stone-900 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100">View Full Cart</Link>
                <Link href="/checkout" onClick={closeCart} className="flex items-center justify-center bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700">Proceed to Checkout</Link>
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
