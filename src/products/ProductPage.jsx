import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ProductPageLoader from "../components/snippets/ProductPageLoader";
import { useParams } from "react-router-dom";
import shopifyApi from "../lib/shopify/shopifyApi";
import { useCart } from "../context/CartContext";
import { GET_PRODUCT_BY_HANDLE } from "../lib/shopify/queries";
import TintedSuncreen from "./ProductsLayout/TintedSuncreen";
import DefaultLayout from "./ProductsLayout/DefaultLayout";

const ProductPage = () => {
  const { handle } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await shopifyApi.post("", {
        query: GET_PRODUCT_BY_HANDLE,
        variables: { handle },
      });
      const fetchedProduct = response.data.data.productByHandle;
      setProduct(fetchedProduct);

      if (fetchedProduct.variants.edges.length > 0) {
        setSelectedVariant(fetchedProduct.variants.edges[0].node);
      }
    } catch (error) {
      setError("Failed to fetch product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [handle]);

  if (error) return <p className="text-center text-red-500">{error}</p>;

  const getProductLayout = () => {
    switch (handle) {
      case "sun-screen-full-protection-broad-spectrum-tinted-sunscreen-with-spf-50":
        return (
          <TintedSuncreen
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
          />
        );
      default:
        return (
          <DefaultLayout
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
          />
        );
    }
  };

  return (
    <Layout title={product ? product.title : "Uniqaya Lifestyles | Product"}>
      {loading ? <ProductPageLoader /> : getProductLayout()}
    </Layout>
  );
};

export default ProductPage;
