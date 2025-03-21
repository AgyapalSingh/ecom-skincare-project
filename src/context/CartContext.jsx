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

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
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
        variantId: item.id.startsWith("gid://")
          ? item.id
          : `gid://shopify/ProductVariant/${item.id}`,
        quantity: item.quantity,
      }));

      const response = await fetch(
        `https://${import.meta.env.VITE_SHOPIFY_APP_URL}/api/${
          import.meta.env.VITE_SHOPIFY_API_VERSION
        }/graphql.json`,
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
      const errors = data.data?.checkoutCreate?.checkoutUserErrors;

      if (errors && errors.length > 0) {
        console.error("Checkout Errors:", errors);
        return;
      }

      if (url) {
        setCheckoutUrl(url);
        window.location.href = url;
      } else {
        console.error("Checkout URL not received:", data);
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        createCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
