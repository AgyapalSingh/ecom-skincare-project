import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ProductPageLoader from "../components/snippets/ProductPageLoader";
import { useParams } from "react-router-dom";
import shopifyApi from "../lib/shopify/shopifyApi";
import { useCart } from "../context/CartContext";
import { GET_PRODUCT_BY_HANDLE } from "../lib/shopify/queries";
import TintedSuncreen from "./ProductsLayout/TintedSuncreen";
import DefaultLayout from "./ProductsLayout/DefaultLayout";
import HydraSuncreen from "./ProductsLayout/HydraSunscreen";
import FootCareCream from "./ProductsLayout/FootCareCream";
import Retinol from "./ProductsLayout/Retinol";
import Moisturizer from "./ProductsLayout/Moisturizer";
import FaceWash from "./ProductsLayout/FaceWash";
import NightCream from "./ProductsLayout/NightCream";
import CalmingSunscreen from "./ProductsLayout/CalmingSunscreen";
import BodyButter from "./ProductsLayout/BodyButter";
import DeTan from "./ProductsLayout/DeTan";
import CartDrawer from "../components/Layout/CartDrawer";

const ProductPage = () => {
  const { handle } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

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
      // 1. Tinted Sunscreen SPF 50 PA+++
      case "sun-screen-full-protection-broad-spectrum-tinted-sunscreen-with-spf-50":
        return (
          <TintedSuncreen
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
            openCartDrawer={toggleDrawer}
          />
        );

      // 2. Uniqaya Hydra Sunscreen SPF 60 PA++++
      case "uniqaya-hydra-sunscreen-spf-60-pa-hyaluronic-acid-niacinamide-sunscreen":
        return (
          <HydraSuncreen
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
            openCartDrawer={toggleDrawer}
          />
        );

      // 3. Foot Care Cream For Dry & Rough Heels
      case "moisturizing-repairing-foot-care-cream-with-coffee-extract-peppermint":
        return (
          <FootCareCream
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
            openCartDrawer={toggleDrawer}
          />
        );

      //4. 1% Encapsulated Retinol Face Serum
      case "anti-aging-encapsulated-retinol-serum-with-vit-e-kakadu-plum-pearl-algae":
        return (
          <Retinol
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
            openCartDrawer={toggleDrawer}
          />
        );

      //5. Hyaluronic Acid Moisturizer with Peach Extract
      case "hyaluronic-acid-moisturizer-for-all-skin-types":
        return (
          <Moisturizer
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
            openCartDrawer={toggleDrawer}
          />
        );

      //6. Salicylic Acid Face Wash
      case "salicylic-acid-face-wash-vitamin-c-foaming-face-wash":
        return (
          <FaceWash
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
            openCartDrawer={toggleDrawer}
          />
        );

      //7. Niacinamide Night Cream For Glowing Skin
      case "skin-restoring-night-repair-cream-with-mulberry-kiwi-extract":
        return (
          <NightCream
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
            openCartDrawer={toggleDrawer}
          />
        );

      //8. Calming Sunscreen For Sensitive Skin and Acne Prone Skin
      case "calming-sunscreen-for-sensitive-acne-prone-skin":
        return (
          <CalmingSunscreen
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
            openCartDrawer={toggleDrawer}
          />
        );

      //9. Anti Stretch Mark Body Butter
      case "anti-stretch-mark-cream":
        return (
          <BodyButter
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
            openCartDrawer={toggleDrawer}
          />
        );

      //10. De-Tan Mask With Niacinamide, Glycolic Acid
      case "de-tan-mask-for-instant-tan-removal-with-niacinamide-glycolic-acid":
        return (
          <DeTan
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
            openCartDrawer={toggleDrawer}
          />
        );
      default:
        return (
          <DefaultLayout
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            addToCart={addToCart}
            openCartDrawer={toggleDrawer}
          />
        );
    }
  };

  return (
    <Layout title={product ? product.title : "Uniqaya Lifestyles | Product"}>
      {loading ? <ProductPageLoader /> : getProductLayout()}

      <CartDrawer isOpen={isDrawerOpen} closeDrawer={toggleDrawer} />
    </Layout>
  );
};

export default ProductPage;
