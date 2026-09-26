"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products";

const categoryOptions = [
  { label: "All", value: "all" },
  { label: "Clothing", value: "Clothing" },
  { label: "Accessories", value: "Accessories" },
  { label: "Watches", value: "Watches" },
  { label: "Footwear", value: "Footwear" },
  { label: "Loungewear", value: "Loungewear" },
  { label: "Lifestyle", value: "Lifestyle" },
  { label: "Home & Living", value: "Home & Living" }
];

const priceOptions = [
  { label: "Any price", value: "all" },
  { label: "Under Rs. 5,000", value: "under-5000" },
  { label: "Rs. 5,000 - 10,000", value: "5000-10000" },
  { label: "Over Rs. 10,000", value: "over-10000" }
];

const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Low to High", value: "price-ascending" },
  { label: "High to Low", value: "price-descending" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" }
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
    </svg>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 border border-stone-300 bg-white px-3 py-3 text-sm font-normal normal-case tracking-normal text-stone-900 outline-none transition focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function matchesPrice(price, priceFilter) {
  if (priceFilter === "under-5000") return price < 5000;
  if (priceFilter === "5000-10000") return price >= 5000 && price <= 10000;
  if (priceFilter === "over-10000") return price > 10000;
  return true;
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function normalizeCategory(value) {
  const normalized = normalizeText(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return normalized === "all-categories" ? "all" : normalized;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const queryCategory = normalizeCategory(searchParams.get("category"));
  const activeQueryCategory = queryCategory === "all" || categoryOptions.some((option) => normalizeCategory(option.value) === queryCategory)
    ? queryCategory
    : "all";
  const [category, setCategory] = useState(activeQueryCategory);
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  useEffect(() => {
    setCategory(activeQueryCategory);
  }, [activeQueryCategory]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery);
    const normalizedCategory = normalizeCategory(category);

    const matchingProducts = products.filter((product) => {
      const productName = normalizeText(product.name);
      const productDescription = normalizeText(product.description);
      const productCategory = normalizeCategory(product.category);
      const matchesSearch = !normalizedQuery || [productName, productDescription, productCategory].some((field) => field.includes(normalizedQuery));
      const matchesCategory = normalizedCategory === "all" || productCategory === normalizedCategory;
      return matchesSearch && matchesCategory && matchesPrice(product.price, priceFilter);
    });

    return [...matchingProducts].sort((firstProduct, secondProduct) => {
      if (sortBy === "price-ascending") return firstProduct.price - secondProduct.price;
      if (sortBy === "price-descending") return secondProduct.price - firstProduct.price;
      if (sortBy === "rating") return secondProduct.rating - firstProduct.rating;
      if (sortBy === "newest") return secondProduct.id - firstProduct.id;
      return firstProduct.id - secondProduct.id;
    });
  }, [category, priceFilter, searchQuery, sortBy]);

  return (
    <>
      <main className="bg-[#f8f6f1] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">The LuxeCart edit</p>
            <h1 className="font-serif text-5xl tracking-tight text-stone-900 sm:text-6xl">Shop Our Collection</h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-stone-500 sm:text-base">
              Explore considered essentials and standout pieces selected for modern living.
            </p>
          </header>

          <div className="mt-10 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
            <aside className="space-y-7 lg:pt-1">
              <div>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Category</h2>
                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start lg:gap-1">
                  {categoryOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setCategory(normalizeCategory(option.value))}
                      className={`px-3 py-2 text-left text-sm transition lg:w-full ${normalizeCategory(category) === normalizeCategory(option.value) ? "bg-stone-900 font-medium text-white" : "text-stone-600 hover:bg-stone-200 hover:text-stone-900"}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <FilterSelect label="Price range" value={priceFilter} onChange={setPriceFilter} options={priceOptions} />
            </aside>

            <section aria-label="Product results">
              <div className="flex flex-col gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex min-w-0 flex-1 items-center gap-3 border border-stone-300 bg-white px-4 py-3 text-stone-500 focus-within:border-stone-900 focus-within:ring-1 focus-within:ring-stone-900 sm:max-w-md">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    <SearchIcon />
                  </span>
                  <span className="sr-only">Search products</span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search products"
                    className="min-w-0 flex-1 bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
                  />
                </label>
                <div className="flex items-end justify-between gap-4 sm:justify-end">
                  <p className="text-sm text-stone-500">Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}</p>
                  <label className="sr-only" htmlFor="sort-products">Sort products</label>
                  <select
                    id="sort-products"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="border-0 bg-transparent py-2 text-sm text-stone-700 outline-none focus:ring-2 focus:ring-stone-900"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>Sort by: {option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              ) : (
                <div className="mt-8 border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
                  <h2 className="font-serif text-3xl text-stone-900">No products found</h2>
                  <p className="mt-3 text-sm text-stone-500">Try a different search or adjust your filters.</p>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(""); setCategory("all"); setPriceFilter("all"); }}
                    className="mt-6 border border-stone-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-stone-900 transition hover:bg-stone-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<main className="bg-[#f8f6f1] px-5 py-24 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl text-sm text-stone-500">Loading collection...</div></main>}>
      <ShopContent />
    </Suspense>
  );
}