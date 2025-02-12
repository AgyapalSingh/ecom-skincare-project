import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const [cart, setCart] = useState(loadCartFromLocalStorage);
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const createCheckout = async () => {
    try {
      const lineItems = cart.map((item) => ({
        variantId: item.id,
        quantity: item.quantity,
      }));

      const response = await fetch(
        `https://${
          import.meta.env.VITE_SHOPIFY_APP_URL
        }/api/2023-01/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": import.meta.env
              .VITE_APP_SHOPIFY_PUBLIC_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: `
            mutation CheckoutCreate($lineItems: [CheckoutLineItemInput!]!) {
              checkoutCreate(input: { lineItems: $lineItems }) {
                checkout {
                  webUrl
                }
                checkoutUserErrors {
                  message
                }
              }
            }
          `,
            variables: { lineItems },
          }),
        }
      );

      const data = await response.json();
      const url = data.data?.checkoutCreate?.checkout?.webUrl;

      if (url) {
        setCheckoutUrl(url);
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, createCheckout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
