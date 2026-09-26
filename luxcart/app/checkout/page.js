"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

function Field({ label, name, type = "text", required = true }) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="border border-stone-300 bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
      />
    </label>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-2xl text-stone-900">{title}</h2>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getCartTotal();

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    clearCart();
    router.push("/order-success");
  }

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8f6f1] px-5 py-20 sm:px-8 lg:px-10">
        <div className="max-w-md text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">Checkout</p>
          <h1 className="mt-3 font-serif text-4xl text-stone-900">Your cart is empty</h1>
          <p className="mt-4 text-sm leading-6 text-stone-500">Add a few considered pieces before continuing to checkout.</p>
          <Link href="/shop" className="mt-7 inline-flex bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f8f6f1] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">LuxeCart checkout</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Complete your order</h1>
          <p className="mt-4 text-sm leading-6 text-stone-500">A few details and your carefully selected pieces will be on their way.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start lg:gap-16">
          <div className="space-y-10">
            <section>
              <SectionHeading eyebrow="01" title="Contact Information" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email address" name="email" type="email" />
                <Field label="Phone number" name="phone" type="tel" />
              </div>
            </section>

            <section>
              <SectionHeading eyebrow="02" title="Shipping Address" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First name" name="firstName" />
                <Field label="Last name" name="lastName" />
                <div className="sm:col-span-2"><Field label="Street address" name="address" /></div>
                <Field label="City" name="city" />
                <Field label="Postal code" name="postalCode" />
              </div>
            </section>

            <section>
              <SectionHeading eyebrow="03" title="Payment Method" />
              <div className="space-y-3">
                <label className={`flex cursor-pointer items-center gap-3 border p-4 transition ${paymentMethod === "cod" ? "border-stone-900 bg-white" : "border-stone-300 bg-transparent"}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={(event) => setPaymentMethod(event.target.value)} className="h-4 w-4 accent-stone-900" />
                  <span><span className="block text-sm font-medium text-stone-900">Cash on Delivery</span><span className="mt-1 block text-xs text-stone-500">Pay when your order arrives.</span></span>
                </label>
                <label className={`flex cursor-pointer items-center gap-3 border p-4 transition ${paymentMethod === "card" ? "border-stone-900 bg-white" : "border-stone-300 bg-transparent"}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={(event) => setPaymentMethod(event.target.value)} className="h-4 w-4 accent-stone-900" />
                  <span><span className="block text-sm font-medium text-stone-900">Credit / Debit Card</span><span className="mt-1 block text-xs text-stone-500">Secure card payment simulation.</span></span>
                </label>
                {paymentMethod === "card" && (
                  <div className="grid gap-4 border border-stone-200 bg-white p-4 sm:grid-cols-2">
                    <div className="sm:col-span-2"><Field label="Card number" name="cardNumber" required={false} /></div>
                    <Field label="Expiry date" name="expiry" required={false} />
                    <Field label="CVV" name="cvv" required={false} />
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="border border-stone-200 bg-white p-5 sm:p-7 lg:sticky lg:top-6">
            <h2 className="font-serif text-2xl text-stone-900">Order Summary</h2>
            <div className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 py-4">
                  <img src={item.image} alt={item.name} className="h-20 w-16 shrink-0 object-cover bg-stone-100" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-stone-900">{item.name}</p>
                    <p className="mt-1 text-xs text-stone-500">Size {item.selectedSize} · Qty {item.quantity}</p>
                    <p className="mt-2 text-sm font-semibold text-stone-900">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-stone-600"><span>Shipping Fee</span><span>Free</span></div>
              <div className="flex justify-between border-t border-stone-200 pt-4 text-base font-semibold text-stone-900"><span>Total Price</span><span>{formatPrice(subtotal)}</span></div>
            </div>
            <button type="submit" disabled={isSubmitting} className="mt-7 w-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-wait disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">{isSubmitting ? "Placing Order..." : "Place Order"}</button>
          </aside>
        </form>
      </div>
    </main>
  );
}