"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "luxecart-cart";
const WISHLIST_STORAGE_KEY = "luxecart-wishlist";

const CartContext = createContext(null);

function readStorage(key) {
	if (typeof window === "undefined") return [];

	try {
		const storedValue = window.localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : [];
	} catch {
		return [];
	}
}

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
		const [toast, setToast] = useState("");
	const [hasHydrated, setHasHydrated] = useState(false);

	useEffect(() => {
		setCart(readStorage(CART_STORAGE_KEY));
		setWishlist(readStorage(WISHLIST_STORAGE_KEY));
		setHasHydrated(true);
	}, []);

	useEffect(() => {
		if (hasHydrated) window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
	}, [cart, hasHydrated]);

	useEffect(() => {
		if (hasHydrated) window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
	}, [wishlist, hasHydrated]);

	function addToCart(product, quantity = 1, selectedSize = "M") {
		const safeQuantity = Math.max(1, Number(quantity) || 1);
		setIsCartOpen(true);
		setToast(`${product.name} added to cart`);
		setCart((currentCart) => {
			const existingItem = currentCart.find(
				(item) => item.id === product.id && item.selectedSize === selectedSize
			);

			if (existingItem) {
				return currentCart.map((item) =>
					item.id === product.id && item.selectedSize === selectedSize
						? { ...item, quantity: item.quantity + safeQuantity }
						: item
				);
			}

			return [...currentCart, { ...product, quantity: safeQuantity, selectedSize }];
		});
	}

	function removeFromCart(productId, selectedSize) {
		setCart((currentCart) => currentCart.filter(
			(item) => !(item.id === productId && item.selectedSize === selectedSize)
		));
	}

	function updateQuantity(productId, selectedSize, newQuantity) {
		const safeQuantity = Math.max(1, Number(newQuantity) || 1);
		setCart((currentCart) => currentCart.map((item) => (
			item.id === productId && item.selectedSize === selectedSize
				? { ...item, quantity: safeQuantity }
				: item
		)));
	}

	function toggleWishlist(product) {
		setWishlist((currentWishlist) => {
			const isAlreadySaved = currentWishlist.some((item) => item.id === product.id);
			setToast(isAlreadySaved ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`);
			return isAlreadySaved
				? currentWishlist.filter((item) => item.id !== product.id)
				: [...currentWishlist, product];
		});
	}

	function clearCart() {
		setCart([]);
	}

	function openCart() {
		setIsCartOpen(true);
	}

	function closeCart() {
		setIsCartOpen(false);
	}

	function clearToast() {
		setToast("");
	}

	function getCartCount() {
		return cart.reduce((total, item) => total + item.quantity, 0);
	}

	function getCartTotal() {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	}

	function isInWishlist(productId) {
		return wishlist.some((item) => item.id === productId);
	}

	const contextValue = useMemo(() => ({
		cart,
		wishlist,
		isCartOpen,
		toast,
		addToCart,
		removeFromCart,
		updateQuantity,
		toggleWishlist,
		clearCart,
		openCart,
		closeCart,
		clearToast,
		getCartCount,
		getCartTotal,
		isInWishlist
	}), [cart, wishlist, isCartOpen, toast]);

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCart must be used within a CartProvider");
	return context;
}
