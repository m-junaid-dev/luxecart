"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
  }

  return (
    <section className="bg-[#f8f6f1] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
          Stay in the know
        </p>
        <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
          Subscribe to Our Newsletter
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-stone-500">
          Receive thoughtful edits, early access, and occasional notes from LuxeCart.
        </p>

        {isSubscribed ? (
          <p className="mt-8 text-sm font-medium text-stone-800" role="status">
            You&apos;re on the list. Thank you for subscribing.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              required
              className="min-w-0 flex-1 border border-stone-300 bg-white px-4 py-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
            />
            <button
              type="submit"
              className="bg-stone-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
