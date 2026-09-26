import "./globals.css";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import ToastNotification from "../components/ToastNotification";

export const metadata = {
	title: "LuxeCart",
	description: "Thoughtfully selected pieces for modern living."
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<CartProvider>
					{children}
					<CartDrawer />
					<ToastNotification />
				</CartProvider>
			</body>
		</html>
	);
}
