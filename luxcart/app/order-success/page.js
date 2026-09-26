import Link from "next/link";

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f8f6f1] px-5 py-20 sm:px-8 lg:px-10">
      <section className="max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-stone-900 text-white">
          <CheckIcon />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">Order confirmed</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Thank you for your order!</h1>
        <p className="mt-5 text-sm leading-7 text-stone-500">Your order has been received and is being prepared with care. We&apos;ll send your delivery updates soon.</p>
        <p className="mt-6 text-sm font-medium text-stone-900">Order ID: #LX-839201</p>
        <Link href="/shop" className="mt-8 inline-flex bg-stone-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">Continue Shopping</Link>
      </section>
    </main>
  );
}