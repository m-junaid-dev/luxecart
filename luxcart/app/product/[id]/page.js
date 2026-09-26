"use client";

import Link from "next/link";
import { useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { useCart } from "../../../context/CartContext";
import { products } from "../../../data/products";

const accordionItems = [
  {
    title: "Shipping Policy",
    content: "Orders are carefully packed and dispatched within 2-4 business days. Delivery timing varies by destination."
  },
  {
    title: "Material & Care",
    content: "Follow the care instructions included with your item. Store thoughtfully and use gentle, appropriate cleaning methods."
  },
  {
    title: "Returns",
    content: "Unused items may be returned within 14 days of delivery. Please contact our customer service team to arrange a return."
  }
];

function HeartIcon({ filled = false }) {
  return (
    <svg aria-hidden="true" className={`h-5 w-5 ${filled ? "fill-current" : "fill-none"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function StarIcon({ filled }) {
  return (
    <svg aria-hidden="true" className={`h-4 w-4 ${filled ? "fill-amber-500 text-amber-500" : "fill-stone-200 text-stone-200"}`} viewBox="0 0 20 20">
      <path d="m10 1.5 2.63 5.33 5.88.85-4.26 4.15 1.01 5.85L10 14.92l-5.26 2.76 1-5.85L1.5 7.68l5.87-.85L10 1.5Z" />
    </svg>
  );
}

function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

function Accordion({ item, isOpen, onToggle }) {
  return (
    <div className="border-t border-stone-200">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-stone-900"
      >
        {item.title}
        <span className="text-xl font-light" aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <p className="max-w-2xl pb-5 text-sm leading-6 text-stone-500">{item.content}</p>}
    </div>
  );
}

export default function ProductDetailsPage({ params }) {
  const product = products.find((item) => String(item.id) === String(params.id));
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [openAccordion, setOpenAccordion] = useState(0);
  const [cartMessage, setCartMessage] = useState("");
  const [wishlistMessage, setWishlistMessage] = useState("");
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 lg:px-10">
        <h1 className="font-serif text-4xl text-stone-900">Product not found</h1>
        <Link href="/shop" className="mt-6 inline-flex bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700">
          Return to Shop
        </Link>
      </main>
    );
  }

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  const productIsWishlisted = isInWishlist(product.id);

  function handleAddToCart() {
    addToCart(product, quantity, selectedSize);
    setCartMessage("Added to cart");
    window.setTimeout(() => setCartMessage(""), 2200);
  }

  function handleToggleWishlist() {
    toggleWishlist(product);
    setWishlistMessage(productIsWishlisted ? "Removed from wishlist" : "Added to wishlist");
    window.setTimeout(() => setWishlistMessage(""), 2200);
  }

  return (
    <main className="bg-[#f8f6f1] px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <Link href="/" className="transition hover:text-stone-900">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="transition hover:text-stone-900">Shop</Link>
          <span aria-hidden="true">/</span>
          <span className="max-w-[16rem] truncate text-stone-900">{product.name}</span>
        </nav>

        <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            {product.badge && <span className="absolute left-4 top-4 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-900">{product.badge}</span>}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{product.category}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-stone-900 sm:text-5xl">{product.name}</h1>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} filled={star <= Math.round(product.rating)} />)}
              </div>
              <span className="text-sm text-stone-500">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-xl font-semibold text-stone-900">{formatPrice(product.price)}</span>
              <span className="text-sm text-stone-400 line-through">{formatPrice(product.oldPrice)}</span>
              {discount > 0 && <span className="bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-800">{discount}% OFF</span>}
            </div>
            <p className="mt-6 max-w-xl text-sm leading-7 text-stone-600">{product.description}</p>

            <div className="mt-8 border-t border-stone-200 pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Size</p>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button key={size} type="button" onClick={() => setSelectedSize(size)} className={`h-11 w-12 border text-sm transition ${selectedSize === size ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 bg-white text-stone-700 hover:border-stone-900"}`} aria-pressed={selectedSize === size}>{size}</button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-12 items-center justify-between border border-stone-300 bg-white sm:w-32">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="flex h-full w-10 items-center justify-center text-lg text-stone-600 transition hover:text-stone-950" aria-label="Decrease quantity">−</button>
                <span className="text-sm text-stone-900" aria-live="polite">{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => value + 1)} className="flex h-full w-10 items-center justify-center text-lg text-stone-600 transition hover:text-stone-950" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" onClick={handleAddToCart} className="h-12 flex-1 bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">{cartMessage || "Add to Cart"}</button>
              <button type="button" onClick={handleToggleWishlist} className={`flex h-12 items-center justify-center border px-4 transition focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 ${productIsWishlisted ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 bg-white text-stone-700 hover:border-stone-900"}`} aria-label={productIsWishlisted ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={productIsWishlisted}><HeartIcon filled={productIsWishlisted} /></button>
            </div>
            {wishlistMessage && <p className="mt-3 text-sm text-stone-600" role="status">{wishlistMessage}</p>}

            <div className="mt-8">
              {accordionItems.map((item, index) => <Accordion key={item.title} item={item} isOpen={openAccordion === index} onToggle={() => setOpenAccordion(openAccordion === index ? -1 : index)} />)}
              <div className="border-t border-stone-200" />
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-stone-200 pt-14 sm:mt-28">
            <h2 className="font-serif text-4xl tracking-tight text-stone-900">You May Also Like</h2>
            <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => <ProductCard key={relatedProduct.id} product={relatedProduct} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}