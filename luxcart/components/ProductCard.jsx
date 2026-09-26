"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

const badgeStyles = {
  Sale: "bg-rose-100 text-rose-800",
  New: "bg-emerald-100 text-emerald-800",
  "Best Seller": "bg-amber-100 text-amber-900"
};

function HeartIcon({ filled = false }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function StarIcon({ filled }) {
  return (
    <svg aria-hidden="true" className={`h-3.5 w-3.5 ${filled ? "fill-amber-500 text-amber-500" : "fill-stone-200 text-stone-200"}`} viewBox="0 0 20 20">
      <path d="m10 1.5 2.63 5.33 5.88.85-4.26 4.15 1.01 5.85L10 14.92l-5.26 2.76 1-5.85L1.5 7.68l5.87-.85L10 1.5Z" />
    </svg>
  );
}

function formatPrice(price) {
  return typeof price === "number" ? `Rs. ${price.toLocaleString("en-PK")}` : "Price unavailable";
}

export default function ProductCard({ product }) {
  const { id, name, category, price, oldPrice, rating, reviews, image, badge } = product;
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const roundedRating = Math.round(rating);
  const wishlisted = isInWishlist(id);

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <Link href={`/product/${id}`} aria-label={`View ${name}`}>
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </Link>
        {badge && (
          <span className={`absolute left-3 top-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${badgeStyles[badge] || "bg-stone-900 text-white"}`}>
            {badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={wishlisted ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          aria-pressed={wishlisted}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm transition duration-300 hover:bg-stone-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 ${wishlisted ? "text-rose-700" : "text-stone-700"}`}
        >
          <HeartIcon filled={wishlisted} />
        </button>
      </div>

      <div className="pt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500">{category}</p>
        <Link href={`/product/${id}`} className="mt-1 block">
          <h3 className="line-clamp-2 min-h-12 font-serif text-lg leading-6 text-stone-900 transition group-hover:text-stone-600">{name}</h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} filled={star <= roundedRating} />
            ))}
          </div>
          {reviews !== undefined && <span className="text-xs text-stone-500">({reviews})</span>}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-semibold text-stone-900">{formatPrice(price)}</span>
          {oldPrice !== undefined && oldPrice !== null && (
            <span className="text-xs text-stone-400 line-through">{formatPrice(oldPrice)}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => addToCart(product, 1, "M")}
          className="mt-4 w-full border border-stone-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-stone-900 transition duration-300 hover:bg-stone-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
