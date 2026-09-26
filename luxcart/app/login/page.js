"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Logo() {
	return (
		<Link href="/" className="inline-flex items-center gap-2 text-stone-900" aria-label="LuxeCart home">
			<span className="flex h-8 w-8 items-center justify-center border border-stone-900 font-serif text-lg">L</span>
			<span className="text-sm font-semibold uppercase tracking-[0.22em]">LuxeCart</span>
		</Link>
	);
}

function Field({ label, name, type, placeholder }) {
	return (
		<label className="block">
			<span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{label}</span>
			<input
				name={name}
				type={type}
				placeholder={placeholder}
				required
				className="mt-2 w-full border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
			/>
		</label>
	);
}

export default function LoginPage() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
		setIsSubmitting(true);
		setTimeout(() => router.push("/"), 600);
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-[#f8f6f1] px-5 py-12 sm:px-8">
			<div className="w-full max-w-md">
				<div className="mb-10 text-center"><Logo /></div>
				<section className="border border-stone-200 bg-white p-6 shadow-[0_16px_50px_rgba(28,25,23,0.05)] sm:p-10">
					<div className="text-center">
						<p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">Your private edit</p>
						<h1 className="mt-3 font-serif text-4xl text-stone-900">Welcome back</h1>
						<p className="mt-3 text-sm leading-6 text-stone-500">Sign in to continue your LuxeCart experience.</p>
					</div>

					<form onSubmit={handleSubmit} className="mt-8 space-y-5">
						<Field label="Email address" name="email" type="email" placeholder="you@example.com" />
						<Field label="Password" name="password" type="password" placeholder="Enter your password" />
						<div className="flex items-center justify-between gap-4 text-xs">
							<label className="flex items-center gap-2 text-stone-500"><input type="checkbox" name="remember" className="h-4 w-4 accent-stone-900" />Remember me</label>
							<button type="button" className="font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-900">Forgot Password?</button>
						</div>
						<button type="submit" disabled={isSubmitting} className="w-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-wait disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2">{isSubmitting ? "Signing in..." : "Sign In"}</button>
					</form>

					<div className="my-7 flex items-center gap-4 text-xs uppercase tracking-[0.16em] text-stone-400"><span className="h-px flex-1 bg-stone-200" />or<span className="h-px flex-1 bg-stone-200" /></div>
					<button type="button" onClick={handleSubmit} disabled={isSubmitting} className="flex w-full items-center justify-center gap-3 border border-stone-300 bg-white px-6 py-3.5 text-sm font-medium text-stone-800 transition hover:border-stone-900 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"><span className="font-serif text-lg">G</span>Continue with Google</button>
					<p className="mt-8 text-center text-sm text-stone-500">New to LuxeCart? <Link href="/register" className="font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-900">Create an account</Link></p>
				</section>
				<p className="mt-6 text-center text-xs text-stone-400"><Link href="/" className="transition hover:text-stone-900">Return to storefront</Link></p>
			</div>
		</main>
	);
}