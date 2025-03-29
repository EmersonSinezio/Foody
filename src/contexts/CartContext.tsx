// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../data/products";
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productName: string) => void;
  increaseQuantity: (productName: string) => void;
  decreaseQuantity: (productName: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Limpa o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Adiciona um item ao carrinho
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.name === product.name
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  // Remove um item do carrinho
  const removeFromCart = (productName: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.name !== productName)
    );
  };

  // Aumenta a quantidade de um item atraves do botão
  const increaseQuantity = (productName: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Diminui a quantidade de um item atraves do botão
  const decreaseQuantity = (productName: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.product.name === productName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
