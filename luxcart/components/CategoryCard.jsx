import Link from "next/link";

export default function CategoryCard({ name, image, href = "/shop" }) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[4/5] overflow-hidden bg-stone-200"
    >
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent transition duration-500 group-hover:from-stone-950/80" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="font-serif text-xl text-white sm:text-2xl">{name}</h3>
        <span className="mt-2 inline-block text-xs font-medium uppercase tracking-[0.18em] text-stone-200 opacity-0 transition duration-300 group-hover:opacity-100">
          Explore collection
        </span>
      </div>
    </Link>
  );
}
