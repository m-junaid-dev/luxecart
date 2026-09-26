"use client";

import { useState } from "react";

function ContactIcon({ children }) {
  return <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-stone-300 text-stone-700">{children}</span>;
}

function MailIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6Zm1 1 7 5 7-5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 4.5 9 4l2 4-2 1.5a13 13 0 0 0 5.5 5.5l1.5-2 4 2-.5 2.5c-.2 1-1.1 1.7-2.1 1.5A16.5 16.5 0 0 1 4.5 6.6c-.2-1 .5-1.9 1.5-2.1Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function DetailRow({ icon, label, children }) {
  return (
    <div className="flex gap-4">
      <ContactIcon>{icon}</ContactIcon>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{label}</p>
        <div className="mt-2 text-sm leading-6 text-stone-700">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
      {label}
      <input name={name} type={type} required className="border border-stone-300 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900" />
    </label>
  );
}

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsSent(true);
    event.currentTarget.reset();
    window.setTimeout(() => setIsSent(false), 3000);
  }

  return (
    <main className="bg-[#f8f6f1] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">We&apos;re here to help</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900 sm:text-6xl">Contact LuxeCart</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-stone-500 sm:text-base">Have a question about an order, a product, or finding the right piece? Our team would be glad to help.</p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <section aria-labelledby="contact-details-heading">
            <h2 id="contact-details-heading" className="font-serif text-3xl text-stone-900">Let&apos;s talk</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-stone-500">Reach us through any of the channels below. We typically respond within one business day.</p>
            <div className="mt-9 space-y-7">
              <DetailRow icon={<MailIcon />} label="Email"><a href="mailto:support@luxecart.com" className="transition hover:text-stone-950">support@luxecart.com</a></DetailRow>
              <DetailRow icon={<PhoneIcon />} label="Phone"><a href="tel:+18005555893" className="transition hover:text-stone-950">+1 800-555-LUXE</a></DetailRow>
              <DetailRow icon={<PinIcon />} label="Headquarters"><p>18 Mercer Street<br />New York, NY 10013<br />United States</p></DetailRow>
            </div>

            <div className="mt-12 border-t border-stone-200 pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Business Hours</p>
              <div className="mt-4 space-y-2 text-sm text-stone-700">
                <p className="flex max-w-xs justify-between gap-6"><span>Monday - Friday</span><span>9:00 - 18:00 EST</span></p>
                <p className="flex max-w-xs justify-between gap-6"><span>Saturday</span><span>10:00 - 16:00 EST</span></p>
                <p className="flex max-w-xs justify-between gap-6"><span>Sunday</span><span>Closed</span></p>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Follow along</p>
              <div className="mt-4 flex gap-2">
                {[
                  ["Instagram", "ig"],
                  ["Facebook", "fb"],
                  ["Pinterest", "pin"]
                ].map(([label, shortLabel]) => <a key={label} href="#" aria-label={label} className="flex h-9 min-w-9 items-center justify-center border border-stone-300 px-2 text-xs font-semibold uppercase text-stone-600 transition hover:border-stone-900 hover:text-stone-900">{shortLabel}</a>)}
              </div>
            </div>
          </section>

          <section className="border border-stone-200 bg-white p-6 sm:p-9" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" className="font-serif text-3xl text-stone-900">Send us a message</h2>
            <p className="mt-3 text-sm leading-6 text-stone-500">Tell us a little about how we can assist.</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Field label="Full name" name="name" />
              <Field label="Email address" name="email" type="email" />
              <Field label="Subject" name="subject" />
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Message
                <textarea name="message" required rows="6" className="resize-y border border-stone-300 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900" />
              </label>
              <button type="submit" className="w-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">{isSent ? "Message Sent!" : "Send Message"}</button>
              {isSent && <p className="text-center text-sm text-stone-600" role="status">Thank you. We&apos;ll be in touch shortly.</p>}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}