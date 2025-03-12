import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const BodyButter = ({ product, selectedVariant, setSelectedVariant, addToCart, openCartDrawer }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(null); // Track selected image

  // Extract Variants
  const variants = product?.variants?.edges?.map((edge) => edge.node) || [];

  // Extract Images
  const images = product?.images?.edges.map(({ node }) => node.src) || [];

  // Get variantId from URL
  const variantIdFromURL = searchParams.get("variant");

  // Set the correct variant when the page loads
  useEffect(() => {
    if (variantIdFromURL) {
      const variantFromURL = variants.find((v) => v.id === variantIdFromURL);
      if (variantFromURL) {
        setSelectedVariant(variantFromURL);
      }
    } else if (variants.length > 0) {
      setSelectedVariant(variants[0]); // Default to the first variant
    }
  }, [variantIdFromURL, variants, setSelectedVariant]);

  // Set default selected image
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]); // Default to the first image
    }
  }, [images]);

  // Update URL when a variant is selected
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setSearchParams({ variant: variant.id }); // Update URL
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart({
        id: selectedVariant.id,
        title: `${product.title} - ${selectedVariant.title}`,
        price: selectedVariant.price.amount,
        image: selectedImage,
      });
      openCartDrawer();
    }
  };

  return (
    <div className="bg-orange-50 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-orange-700">{product.title}</h1>

      {/* Main Selected Image */}
      <img
        src={selectedImage || "default-image.jpg"}
        alt={product.title}
        className="w-full max-w-sm mt-4 rounded-md border border-gray-300"
      />

      {/* Thumbnail Images */}
      <div className="flex flex-wrap gap-4 mt-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Product Image ${index + 1}`}
            className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 ${
              selectedImage === img ? "border-orange-600" : "border-gray-200"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

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
