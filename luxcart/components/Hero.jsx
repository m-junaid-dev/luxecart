import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-stone-900 text-white">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=85)"
        }}
      />
      <div className="absolute inset-0 -z-10 bg-stone-950/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-950/75 via-stone-950/35 to-transparent" />

      <div className="mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-20 sm:px-8 sm:py-24 lg:min-h-[680px] lg:px-10">
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-stone-200">
            New arrivals / 2026
          </p>
          <h1 className="max-w-lg font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
            <span className="block text-stone-200">NEW SEASON</span>
            <span className="mt-4 block">Style That Speaks You</span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-stone-200 sm:text-lg">
            Thoughtfully selected pieces for a wardrobe that feels entirely your own.
          </p>
          <Link
            href="/shop"
            className="mt-9 inline-flex items-center justify-center bg-white px-7 py-3.5 text-sm font-semibold text-stone-900 transition hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-900"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
