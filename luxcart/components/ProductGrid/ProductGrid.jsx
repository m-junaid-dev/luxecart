export default function ProductGrid({ children }) {
	return <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{children}</div>;
}
