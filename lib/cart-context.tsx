"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useBranch } from "./branch-context";

export interface CartItem {
    key: string;
    name: string;
    price: number;
    unitPrice: number;
    qty: number;
    weight: number | null;
    isByWeight: boolean;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (key: string) => void;
    updateQty: (key: string, qty: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { onBranchChange } = useBranch();

    // Register callback to clear cart when branch changes
    useEffect(() => {
        onBranchChange(() => {
            setCart([]);
        });
    }, [onBranchChange]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existingItem = prev.find((i) => i.key === item.key);
            if (existingItem) {
                return prev.map((i) =>
                    i.key === item.key
                        ? { ...i, qty: i.qty + item.qty, price: item.price }
                        : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (key: string) => {
        setCart((prev) => prev.filter((i) => i.key !== key));
    };

    const updateQty = (key: string, qty: number) => {
        setCart((prev) =>
            prev.map((i) =>
                i.key === key
                    ? { ...i, qty: Math.max(0, qty) }
                    : i
            ).filter(i => i.qty > 0)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    };

    const getCartCount = () => {
        return cart.reduce((acc, item) => acc + item.qty, 0);
    };

    const value: CartContextType = {
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        getCartTotal,
        getCartCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}
