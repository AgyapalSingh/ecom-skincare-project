import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const BodyButter = ({
  product,
  selectedVariant,
  setSelectedVariant,
  addToCart,
  openCartDrawer,
}) => {
  const [searchParams] = useSearchParams();
  const [variantId, setVariantId] = useState(searchParams.get("variant"));

  // Extract Variants
  const variants = product?.variants?.edges?.map((edge) => edge.node) || [];

  // Set correct variant when the page loads
  useEffect(() => {
    const variantFromURL = variants.find((v) => v.id === variantId);
    if (variantFromURL) {
      setSelectedVariant(variantFromURL);
    } else if (variants.length > 0) {
      setSelectedVariant(variants[0]); // Default to first variant
    }
  }, [variantId, variants, setSelectedVariant]);

  // Handle Variant Selection
  const handleVariantSelect = (variant) => {
    if (selectedVariant?.id === variant.id) return; // Prevent unnecessary updates

    setSelectedVariant(variant);
    setVariantId(variant.id);

    // Update URL without causing a re-render
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?variant=${variant.id}`
    );
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart({
        id: selectedVariant.id,
        title: `${product.title} - ${selectedVariant.title}`,
        price: selectedVariant.price.amount,
        image: product.images.edges[0]?.node.src,
      });
      openCartDrawer();
    }
  };

  return (
    <div className="bg-orange-50 p-6 rounded-lg shadow-lg">
      <h1>Body Butter Component</h1>
      <h1 className="text-4xl font-bold text-orange-700">{product.title}</h1>

      {/* Product Image */}
      <img
        src={product.images.edges[0]?.node.src || "default-image.jpg"}
        alt={product.images.edges[0]?.node.altText || product.title}
        className="w-full max-w-sm mt-4 rounded-md"
      />

      <p className="text-gray-800 mt-4">{product.description}</p>

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
    </div>
  );
};

export default BodyButter;
