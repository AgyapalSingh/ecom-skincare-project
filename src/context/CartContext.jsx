import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const [cart, setCart] = useState(loadCartFromLocalStorage);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [freeProducts, setFreeProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchFreeProducts = async () => {
      try {
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
              query: `{
                collection(id: "${import.meta.env.VITE_FREE_PRODUCTS_GID}") {
                  products(first: 20) {
                    edges {
                      node {
                        id
                        title
                        handle
                        images(first: 1) {
                          edges {
                            node {
                              url
                            }
                          }
                        }
                        variants(first: 1) {  
                          edges {
                            node {
                              id
                              title
                              availableForSale  
                              price {
                                amount
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }`,
            }),
          }
        );

        const data = await response.json();
        const freeProductsData =
          data?.data?.collection?.products?.edges.map((edge) => ({
            id: edge.node.variants.edges[0].node.id,
            title: edge.node.title,
            variantTitle: edge.node.variants.edges[0]?.node?.title,
            image: edge.node.images.edges[0]?.node?.url || "default-image.jpg",
            price: 0,
            quantity: 1,
          })) || [];

        setFreeProducts(freeProductsData);
      } catch (error) {
        console.error("Error fetching free products:", error);
      }
    };

    fetchFreeProducts();
  }, []);

  const updateCartWithFreeProducts = (cart) => {
    const totalPaidItemsQty = cart
      .filter((item) => item.price > 0)
      .reduce((sum, item) => sum + item.quantity, 0);

    let updatedCart = cart.filter((item) => item.price > 0);

    if (totalPaidItemsQty >= 2) {
      const freeProductsToAdd = freeProducts.slice(0, 4);
      freeProductsToAdd.forEach((freeProduct) => {
        if (!updatedCart.find((item) => item.id === freeProduct.id)) {
          updatedCart.push(freeProduct);
        }
      });
    }

    return updatedCart;
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      let updatedCart;
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      return updateCartWithFreeProducts(updatedCart);
    });
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      return updateCartWithFreeProducts(updatedCart);
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return updateCartWithFreeProducts(updatedCart);
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      return updateCartWithFreeProducts(updatedCart);
    });
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
