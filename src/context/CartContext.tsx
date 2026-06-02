/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  promoCode: string;
  promoDiscount: number; // percentage (e.g. 10 for 10%)
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  cartCount: number;
  subTotal: number;
  discountAmount: number;
  deliveryFee: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shopco_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [promoCode, setPromoCode] = useState<string>(() => {
    return localStorage.getItem('shopco_promo_code') || '';
  });

  const [promoDiscount, setPromoDiscount] = useState<number>(() => {
    const saved = localStorage.getItem('shopco_promo_discount');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('shopco_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shopco_promo_code', promoCode);
    localStorage.setItem('shopco_promo_discount', promoDiscount.toString());
  }, [promoCode, promoDiscount]);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      }

      return [...prevItems, { product, selectedSize: size, selectedColor: color, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    removePromoCode();
  };

  const applyPromoCode = (code: string): boolean => {
    const upperCode = code.trim().toUpperCase();
    if (upperCode === 'SHOP20') {
      setPromoCode(upperCode);
      setPromoDiscount(20);
      return true;
    } else if (upperCode === 'DISCOUNT10') {
      setPromoCode(upperCode);
      setPromoDiscount(10);
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscount(0);
  };

  // Computations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Subtotal is sum of regular prices before promo codes, but includes basic product discounts
  const subTotal = cartItems.reduce((acc, item) => {
    const price = item.product.originalPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  // Standard Product discount
  const productDiscount = cartItems.reduce((acc, item) => {
    if (item.product.originalPrice) {
      return acc + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return acc;
  }, 0);

  // Extra Promo discount based on current cart subtotal after product discount
  const baseTotalAfterProductDiscount = subTotal - productDiscount;
  const promoDiscountAmount = Math.round(baseTotalAfterProductDiscount * (promoDiscount / 100));

  const discountAmount = productDiscount + promoDiscountAmount;

  const totalBeforeDelivery = subTotal - discountAmount;
  const deliveryFee = totalBeforeDelivery > 0 && totalBeforeDelivery < 200 ? 15 : 0; // Free above $200
  const finalTotal = totalBeforeDelivery > 0 ? totalBeforeDelivery + deliveryFee : 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        promoCode,
        promoDiscount,
        applyPromoCode,
        removePromoCode,
        cartCount,
        subTotal,
        discountAmount,
        deliveryFee,
        finalTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
