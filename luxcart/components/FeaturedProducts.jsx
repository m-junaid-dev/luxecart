import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
              The edit
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
              Featured Products
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-stone-500">
            Timeless favorites and fresh arrivals, selected to make everyday dressing feel effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
