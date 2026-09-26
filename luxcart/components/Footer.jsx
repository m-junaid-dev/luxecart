import Link from "next/link";

const quickLinks = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

const categories = [
  { label: "Women's Fashion", href: "/shop?category=womens-fashion" },
  { label: "Men's Fashion", href: "/shop?category=mens-fashion" },
  { label: "Footwear", href: "/shop?category=footwear" },
  { label: "Accessories", href: "/shop?category=accessories" }
];

const serviceLinks = [
  { label: "Shipping & Returns", href: "/contact" },
  { label: "FAQs", href: "/contact" },
  { label: "Size Guide", href: "/contact" }
];

function SocialIcon({ label, children }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center border border-stone-700 text-stone-300 transition hover:border-white hover:text-white"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect width="17" height="17" x="3.5" y="3.5" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v4h4v-4h3.2l.8-4H13V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a7 7 0 0 0-2.5 13.54c-.06-1.16-.01-2.56.3-3.67l1.06-4.49s-.27-.54-.27-1.34c0-1.25.73-2.19 1.64-2.19.77 0 1.14.58 1.14 1.28 0 .78-.5 1.95-.76 3.04-.22.91.46 1.65 1.36 1.65 1.64 0 2.9-1.73 2.9-4.23 0-2.21-1.59-3.76-3.86-3.76-2.63 0-4.18 1.97-4.18 4.01 0 .79.3 1.64.69 2.1.08.1.09.19.07.29l-.26 1.08c-.04.17-.14.21-.32.13-1.18-.55-1.92-2.26-1.92-3.64 0-2.96 2.15-5.68 6.2-5.68 3.25 0 5.78 2.32 5.78 5.42 0 3.23-2.04 5.83-4.87 5.83-.95 0-1.84-.49-2.15-1.06l-.58 2.21c-.21.81-.77 1.83-1.15 2.45A8 8 0 1 0 12 4Z" />
    </svg>
  );
}

function FooterLinks({ links }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className="text-sm text-stone-400 transition hover:text-white">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="bg-stone-950 px-5 pb-8 pt-14 text-white sm:px-8 sm:pt-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-stone-800 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
          <div className="max-w-xs">
            <Link href="/" className="font-serif text-3xl tracking-tight">
              LuxeCart
            </Link>
            <p className="mt-5 text-sm leading-6 text-stone-400">
              A considered collection of modern essentials, selected to bring ease and intention to everyday living.
            </p>
            <div className="mt-6 flex gap-2">
              <SocialIcon label="Instagram"><InstagramIcon /></SocialIcon>
              <SocialIcon label="Facebook"><FacebookIcon /></SocialIcon>
              <SocialIcon label="Pinterest"><PinterestIcon /></SocialIcon>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-200">Quick Links</h2>
            <FooterLinks links={quickLinks} />
          </div>
          <div>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-200">Categories</h2>
            <FooterLinks links={categories} />
          </div>
          <div>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-200">Customer Service</h2>
            <FooterLinks links={serviceLinks} />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LuxeCart. All rights reserved.</p>
          <p>Designed for considered living.</p>
        </div>
      </div>
    </footer>
  );
}
