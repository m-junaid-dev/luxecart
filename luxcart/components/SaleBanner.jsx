import Link from "next/link";

export default function SaleBanner() {
  return (
    <section className="bg-stone-900 px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 border-y border-stone-700 py-8 sm:flex-row sm:items-center sm:py-10">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-stone-300">
            Limited Time Offer
          </p>
          <h2 className="font-serif text-4xl leading-none tracking-tight sm:text-6xl">
            UP TO 50% OFF
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-stone-300">
            Make room for something new with considered pieces at an exceptional price.
          </p>
        </div>
        <Link
          href="/shop?sale=true"
          className="inline-flex items-center justify-center bg-white px-7 py-3.5 text-sm font-semibold text-stone-900 transition hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-900"
        >
          Shop Sale
        </Link>
      </div>
    </section>
  );
}
