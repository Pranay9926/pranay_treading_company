
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { type CartItem } from '@/types/cart';
import { type Shoe } from '@/lib/data';

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: Shoe) => void;
  removeItemFromCart: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const isBrowser = typeof window !== 'undefined';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (!isBrowser) return []; // Return empty array on server
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    if (!isBrowser) return; // Don't run effect on server
    try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
        console.error("Error saving cart to localStorage", error);
    }
  }, [cartItems]);

  const addItemToCart = useCallback((item: Shoe) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const removeItemFromCart = useCallback((itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const updateItemQuantity = useCallback((itemId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item // Ensure quantity is at least 1
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        getCartItemCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
