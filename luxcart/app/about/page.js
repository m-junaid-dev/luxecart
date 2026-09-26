import Link from "next/link";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const valuePillars = [
	{
		number: "01",
		title: "Uncompromising Quality",
		text: "We choose materials and makers for their lasting character, so every piece earns its place in your everyday life."
	},
	{
		number: "02",
		title: "Ethical Craftsmanship",
		text: "From considered sourcing to responsible production, we work with partners who value people, process, and the planet."
	},
	{
		number: "03",
		title: "Timeless Design",
		text: "Our edit is guided by quiet confidence: thoughtful forms and enduring details that live beyond a single season."
	}
];

const stats = [
	{ value: "10k+", label: "Happy clients" },
	{ value: "100%", label: "Sustainable materials" },
	{ value: "15+", label: "Countries served" }
];

export default function AboutPage() {
	return (
		<>
			<Navbar />
			<main>
				<section className="border-b border-stone-200 bg-[#eeeae2]">
					<div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20 lg:px-10 lg:py-36">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Our story</p>
							<h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight text-stone-950 sm:text-6xl lg:text-8xl">
								Crafting Considered Essentials for Modern Living
							</h1>
						</div>
						<div className="max-w-md lg:mb-2 lg:justify-self-end">
							<div className="mb-7 h-px w-14 bg-stone-900" />
							<p className="text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
								LuxeCart is a quieter way to shop. We bring together minimalist luxury, sustainable sourcing, and timeless design to make the everyday feel more intentional.
							</p>
						</div>
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
					<div className="grid gap-10 border-b border-stone-200 pb-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:pb-20">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">What guides us</p>
							<h2 className="mt-4 max-w-sm font-serif text-4xl leading-tight tracking-tight text-stone-900 sm:text-5xl">
								Less, but better.
							</h2>
						</div>
						<div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
							{valuePillars.map((pillar) => (
								<article key={pillar.number}>
									<p className="text-sm text-stone-400">{pillar.number}</p>
									<h3 className="mt-8 max-w-[12rem] font-serif text-2xl leading-tight text-stone-900">{pillar.title}</h3>
									<p className="mt-4 text-sm leading-6 text-stone-600">{pillar.text}</p>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className="bg-stone-900 text-stone-100">
					<div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-10">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">By the numbers</p>
							<h2 className="mt-4 max-w-sm font-serif text-4xl leading-tight tracking-tight sm:text-5xl">A growing community of considered living.</h2>
						</div>
						<div className="grid grid-cols-1 divide-y divide-stone-700 border-y border-stone-700 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
							{stats.map((stat) => (
								<div key={stat.label} className="py-6 sm:px-6 sm:py-2 first:sm:pl-0 last:sm:pr-0">
									<p className="font-serif text-4xl tracking-tight text-white sm:text-5xl">{stat.value}</p>
									<p className="mt-2 text-xs uppercase tracking-[0.15em] text-stone-400">{stat.label}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
					<div className="flex flex-col items-start justify-between gap-8 border-b border-stone-200 pb-14 sm:flex-row sm:items-end sm:pb-20">
						<div className="max-w-2xl">
							<p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">The collection</p>
							<h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-stone-900 sm:text-6xl">Make room for what matters.</h2>
						</div>
						<Link href="/shop" className="inline-flex shrink-0 items-center justify-center bg-stone-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">
							Explore the catalog
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}