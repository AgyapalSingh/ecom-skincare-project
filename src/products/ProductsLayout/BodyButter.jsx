import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ProductLayoutCSS/DefaultProductLayout.css";

const BodyButter = ({
  product,
  selectedVariant,
  setSelectedVariant,
  addToCart,
  openCartDrawer,
}) => {
  const [searchParams] = useSearchParams();
  
  // Extract numeric variant ID from URL
  const [variantId, setVariantId] = useState(
    searchParams.get("variant")?.match(/\d+$/)?.[0] || null
  );

  const images = product?.images?.edges?.map((edge) => edge.node) || [];

  // State for selected main image
  const [mainImage, setMainImage] = useState(images[0]?.src || "default-image.jpg");

  // Extract Variants
  const variants = product?.variants?.edges?.map((edge) => edge.node) || [];

  // Set correct variant when the page loads
  useEffect(() => {
    const variantFromURL = variants.find((v) => v.id.endsWith(variantId));
    if (variantFromURL) {
      setSelectedVariant(variantFromURL);
    } else if (variants.length > 0) {
      setSelectedVariant(variants[0]); // Default to first variant
    }
  }, [variantId, variants, setSelectedVariant]);
  
  useEffect(() => {
    if (selectedVariant) {
      // Check if the selected variant has an associated image, else use first product image
      const variantImage = selectedVariant.image?.src || images[0]?.src || "default-image.jpg";
      setMainImage(variantImage);
    }
  }, [selectedVariant, images]); // Depend on selectedVariant and images
  

  // Handle Variant Selection
  const handleVariantSelect = (variant) => {
    if (selectedVariant?.id === variant.id) return; // Prevent unnecessary updates

    setSelectedVariant(variant);
    setVariantId(variant.id.match(/\d+$/)?.[0]); // Store numeric ID

    // Update URL without causing a re-render
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?variant=${variant.id.match(/\d+$/)?.[0]}`
    );
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (selectedVariant) {
      const variantId = selectedVariant.id.split("/").pop();
      const productUrl = `${window.location.origin}${window.location.pathname}?variant=${variantId}`;
      // console.log(productUrl, "Product Url from Product Page")
      addToCart({
        id: variantId, 
        title: `${product.title} - ${selectedVariant.title}`,
        price: selectedVariant.price.amount,
        image: product.images.edges[0]?.node.src,
        url: productUrl,
      });
      openCartDrawer();
    }
  };

  return (
    <div className="bg-orange-50 p-6 rounded-lg shadow-lg">
      <h1>Body Butter Component</h1>
      <h1 className="text-4xl font-bold text-orange-700">{product.title}</h1>

      {/* Product Image */}
      <div className="uniq-ag-product-display">
        <div className="uniq-ag-product-main-thumbnail">
          <img
            src={mainImage}
            alt={product.title}
          />
        </div>

        {/* Secondary Images - Clickable */}
        <div className="uniq-ag-product-sec-images gap-2 mt-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src || "default-image.jpg"}
              alt={image.altText || product.title}
              className={`uniq-ag-product-sec-image ${
                mainImage === image.src ? " uniq-ag-product-sec-image-active" : ""
              }`}
              onClick={() => setMainImage(image.src)}
            />
          ))}
        </div>
      </div>

      
      {/* Variant Selection */}
      {variants.length > 1 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => handleVariantSelect(variant)}
              className={`px-4 py-2 rounded border ${
                selectedVariant?.id === variant.id
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {variant.title}
            </button>
          ))}
        </div>
      )}

      <p className="text-gray-600 mt-2">
        Rs.{" "}
        {selectedVariant
          ? selectedVariant.price.amount
          : product.priceRange.minVariantPrice.amount}
      </p>

      <button
        onClick={handleAddToCart}
        className={`mt-6 px-6 py-3 rounded text-white w-full ${
          selectedVariant?.availableForSale
            ? "bg-orange-600 hover:bg-orange-700"
            : "bg-gray-500 cursor-not-allowed"
        }`}
        disabled={!selectedVariant?.availableForSale}
      >
        {selectedVariant?.availableForSale ? "Add to Cart" : "Restocking"}
      </button>


      <p className="text-gray-800 mt-4">{product.description}</p>

    </div>
  );
};

export default BodyButter;