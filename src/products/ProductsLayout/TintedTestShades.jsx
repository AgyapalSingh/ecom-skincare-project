import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const TintedTestShades = ({
  product,
  setSelectedVariant,
  addToCart,
  openCartDrawer,
}) => {
  const [searchParams] = useSearchParams();
  const initialVariantId = searchParams.get("variant") || "";
  const [variantId, setVariantId] = useState(initialVariantId);

  // Extract Variants
  const variants = product?.variants?.edges?.map((edge) => edge.node) || [];

  // Extract unique colors and sizes
  const colorOptions = [
    ...new Set(variants.map((v) => v.title.split(" / ")[0])),
  ];
  const sizeOptions = [
    ...new Set(variants.map((v) => v.title.split(" / ")[1])),
  ];

  // Map colors to hex values
  const colorMap = {
    ivorydawn: "#fdcea4",
    sunkissed: "#faaf75",
    bronzebliss: "#dd8e53",
  };

  // Find the matching variant or default to the first one
  const matchedVariant =
    variants.find((v) => v.id === variantId) || variants[0];

  // Extract color and size from the variant title (assuming format "Color / Size")
  const [selectedColor, selectedSize] = matchedVariant?.title.split(" / ") || [
    "",
    "",
  ];

  // Update the selected variant
  useEffect(() => {
    if (matchedVariant) {
      setSelectedVariant(matchedVariant);
    }
  }, [matchedVariant, setSelectedVariant]);

  // Update URL without reloading
  const updateURL = (variantId) => {
    const numericId = variantId.split("/").pop();
    setVariantId(variantId);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?variant=${numericId}`
    );
  };

  // Handle Variant Selection
  const handleVariantSelect = (color, size) => {
    const selectedVariant = variants.find((v) => {
      const [variantColor, variantSize] = v.title.split(" / ");
      return variantColor === color && variantSize === size;
    });

    if (selectedVariant && selectedVariant.id !== variantId) {
      updateURL(selectedVariant.id);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!matchedVariant) return;

    addToCart({
      id: matchedVariant.id,
      title: product.title,
      variantTitle: matchedVariant.title,
      price: matchedVariant.price.amount,
      image:
        matchedVariant.image?.src ||
        product.images.edges[0]?.node.src ||
        "default-image.jpg",
    });

    openCartDrawer();
  };

  return (
    <div className="bg-orange-50 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-orange-700">{product.title}</h1>
      <p className="text-gray-600 mt-2">
        Rs. {matchedVariant?.price.amount || "N/A"}
      </p>

      {/* Product Image */}
      <img
        src={
          matchedVariant?.image?.src ||
          product.images.edges[0]?.node.src ||
          "default-image.jpg"
        }
        alt={product.images.edges[0]?.node.altText || product.title}
        className="w-full max-w-sm mt-4 rounded-md"
      />

      <p className="text-gray-800 mt-4">{product.description}</p>

      {/* Color Selection */}
      {colorOptions.length > 1 && (
        <div className="uniq-col-prod-varient">
          <div className="color-swatches flex gap-2 mt-4">
            {colorOptions.map((color) => (
              <span
                key={color}
                onClick={() => handleVariantSelect(color, selectedSize)}
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: colorMap[color] || color.toLowerCase(),
                  border:
                    selectedColor === color
                      ? "3px solid black"
                      : "1px solid gray",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              ></span>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizeOptions.length > 1 && (
        <div className="uniq-col-prod-varient mt-4">
          <div className="size-buttons flex gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => handleVariantSelect(selectedColor, size)}
                className={`px-4 py-2 rounded border ${
                  selectedSize === size
                    ? "bg-orange-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`mt-6 px-6 py-3 rounded text-white w-full ${
          matchedVariant?.availableForSale
            ? "bg-orange-600 hover:bg-orange-700"
            : "bg-gray-500 cursor-not-allowed"
        }`}
        disabled={!matchedVariant?.availableForSale}
      >
        {matchedVariant?.availableForSale ? "Add to Cart" : "Restocking"}
      </button>
    </div>
  );
};

export default TintedTestShades;
