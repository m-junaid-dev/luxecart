"use client";

import { useState } from "react";
import Link from "next/link";
import AnnouncementBar from "./AnnouncementBar";
import { useCart } from "../context/CartContext";

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 20a6 6 0 0 0-12 0m9-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l1 12H5L6 8Zm3 0a3 3 0 0 1 6 0" />
    </svg>
  );
}

function MenuIcon({ isOpen }) {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

const categoryLinks = [
  { label: "All categories", categoryName: "all" },
  { label: "Clothing", categoryName: "clothing" },
  { label: "Accessories", categoryName: "accessories" },
  { label: "Watches", categoryName: "watches" },
  { label: "Footwear", categoryName: "footwear" },
  { label: "Home & Living", categoryName: "home & living" }
];

function ActionButton({ label, href, icon, count, onClick }) {
  const className = "relative flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-stone-100 hover:text-stone-950";
  const content = (
    <>
      {icon}
      {count > 0 && (
        <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-900 px-1 text-[10px] font-semibold leading-none text-white">
          {count}
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={label} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} aria-label={label} className={className}>
      {content}
    </Link>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { getCartCount, wishlist, openCart } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="relative z-50 border-b border-stone-200 bg-[#f8f6f1] text-stone-900">
      <AnnouncementBar />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10" aria-label="Main navigation">
        <Link href="/" className="font-serif text-2xl font-semibold tracking-tight text-stone-950">
          LuxeCart
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div className="relative">
            <button
              type="button"
              aria-expanded={isCategoriesOpen}
              aria-haspopup="menu"
              onClick={() => setIsCategoriesOpen((open) => !open)}
              className="flex items-center gap-1 text-sm font-medium text-stone-600 transition hover:text-stone-950"
            >
              Categories
              <svg aria-hidden="true" className={`h-4 w-4 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {isCategoriesOpen && (
              <div className="absolute left-1/2 top-full z-[100] mt-4 w-56 -translate-x-1/2 border border-stone-200 bg-[#f8f6f1] p-2 shadow-xl" role="menu">
                {categoryLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={`/shop?category=${encodeURIComponent(link.categoryName.toLowerCase())}`}
                    role="menuitem"
                    onClick={() => setIsCategoriesOpen(false)}
                    className="block px-3 py-2.5 text-sm text-stone-600 transition hover:bg-stone-100 hover:text-stone-950"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navigationLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-sm font-medium text-stone-600 transition hover:text-stone-950">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <ActionButton label="Search" href="/shop" icon={<SearchIcon />} />
          <ActionButton label="Wishlist" href="/wishlist" icon={<HeartIcon />} count={wishlist.length} />
          <ActionButton label="Profile" href="/login" icon={<UserIcon />} />
          <ActionButton label="Open cart" icon={<BagIcon />} count={cartCount} onClick={openCart} />
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-stone-100 md:hidden"
        >
          <MenuIcon isOpen={isMenuOpen} />
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-stone-200 px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            <button
              type="button"
              aria-expanded={isCategoriesOpen}
              onClick={() => setIsCategoriesOpen((open) => !open)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-950"
            >
              Categories
              <svg aria-hidden="true" className={`h-4 w-4 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {isCategoriesOpen && (
              <div className="z-[100] border-l border-stone-200 pl-3" role="menu">
                {categoryLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={`/shop?category=${encodeURIComponent(link.categoryName.toLowerCase())}`}
                    role="menuitem"
                    onClick={() => { setIsCategoriesOpen(false); setIsMenuOpen(false); }}
                    className="block px-3 py-2.5 text-sm text-stone-600 transition hover:bg-stone-100 hover:text-stone-950"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-950"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1 border-t border-stone-200 pt-3">
            <ActionButton label="Search" href="/shop" icon={<SearchIcon />} />
            <ActionButton label="Wishlist" href="/wishlist" icon={<HeartIcon />} count={wishlist.length} />
            <ActionButton label="Profile" href="/login" icon={<UserIcon />} />
            <ActionButton label="Open cart" icon={<BagIcon />} count={cartCount} onClick={openCart} />
          </div>
        </div>
      )}
    </header>
  );
}
