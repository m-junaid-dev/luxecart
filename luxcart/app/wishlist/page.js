"use client";

import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../context/CartContext";

export default function WishlistPage() {
  const { wishlist, addToCart, toggleWishlist } = useCart();

  function handleMoveToCart(product) {
    addToCart(product, 1, "M");
    toggleWishlist(product);
  }

  return (
    <main className="bg-[#f8f6f1] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">Your personal edit</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900 sm:text-6xl">Your Saved Wishlist</h1>
          <p className="mt-5 text-sm leading-6 text-stone-500">Keep the pieces you love close, and return to them whenever you are ready.</p>
        </header>

        {wishlist.length === 0 ? (
          <section className="mt-14 border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-2xl text-stone-500" aria-hidden="true">♡</div>
            <h2 className="mt-6 font-serif text-3xl text-stone-900">Your wishlist is empty</h2>
            <p className="mt-3 text-sm text-stone-500">Save considered pieces here as you explore the collection.</p>
            <Link href="/shop" className="mt-7 inline-flex bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">Explore Collection</Link>
          </section>
        ) : (
          <>
            <div className="mt-10 flex items-center justify-between border-b border-stone-200 pb-5">
              <p className="text-sm text-stone-500">{wishlist.length} {wishlist.length === 1 ? "saved item" : "saved items"}</p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {wishlist.map((product) => (
                <div key={product.id} className="min-w-0">
                  <ProductCard product={product} />
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => handleMoveToCart(product)} className="border border-stone-900 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-900 transition hover:bg-stone-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">Move to Cart</button>
                    <button type="button" onClick={() => toggleWishlist(product)} className="border border-stone-300 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-600 transition hover:border-stone-900 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}