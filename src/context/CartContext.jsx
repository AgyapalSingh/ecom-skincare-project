import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the Cart
const CartContext = createContext();

// Create a Provider component
export const CartProvider = ({ children }) => {
  // Try to load the cart from localStorage if it exists
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  // Initialize cart state from localStorage
  const [cart, setCart] = useState(loadCartFromLocalStorage);

  // Add item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > -1) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart state
export const useCart = () => {
  return useContext(CartContext);
};
