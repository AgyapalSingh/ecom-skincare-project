import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const TintedTestShades = ({ product, setSelectedVariant, addToCart, openCartDrawer }) => {
  const [searchParams] = useSearchParams();
  const [variantId, setVariantId] = useState(searchParams.get("variant"));

  // Extract Variants
  const variants = product?.variants?.edges?.map((edge) => edge.node) || [];

  // Find selected variant based on URL or default to first variant
  const matchedVariant = variants.find((v) => v.id === variantId) || variants[0];

  // Extract color and size from variant title (assuming format "Color / Size")
  const [selectedColor, selectedSize] = matchedVariant?.title.split(" / ") || ["", ""];

  // Update the selected variant without triggering unnecessary re-renders
  useEffect(() => {
    setSelectedVariant(matchedVariant);
  }, [matchedVariant, setSelectedVariant]);

  // Update URL without re-rendering
  const updateURL = (variantId) => {
    setVariantId(variantId); // Update state
    window.history.replaceState(null, "", `${window.location.pathname}?variant=${variantId}`);
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
    if (matchedVariant) {
      addToCart({
        id: matchedVariant.id,
        title: `${product.title} - ${matchedVariant.title}`,
        price: matchedVariant.price.amount,
        image: product.images.edges[0]?.node.src,
      });
      openCartDrawer();
    }
  };

  // Extract unique colors and sizes
  const colorOptions = [...new Set(variants.map((v) => v.title.split(" / ")[0]))];
  const sizeOptions = [...new Set(variants.map((v) => v.title.split(" / ")[1]))];

  // Map colors to hex values
  const colorMap = {
    ivorydawn: "#fdcea4",
    sunkissed: "#faaf75",
    bronzebliss: "#dd8e53",
  };

  return (
    <div className="bg-orange-50 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-orange-700">{product.title}</h1>
      <p className="text-gray-600 mt-2">Rs. {matchedVariant ? matchedVariant.price.amount : "N/A"}</p>

      <img
        src={product.images.edges[0]?.node.src || "default-image.jpg"}
        alt={product.images.edges[0]?.node.altText || product.title}
        className="w-full max-w-sm mt-4 rounded-md"
      />

      <p className="text-gray-800 mt-4">{product.description}</p>

      {/* Color Selection */}
      {colorOptions.length > 1 && (
        <div className="uniq-col-prod-varient">
          <div className="color-swatches">
            {colorOptions.map((color) => {
              const bgColor = colorMap[color] || color.toLowerCase();
              return (
                <span
                  key={color}
                  onClick={() => handleVariantSelect(color, selectedSize)}
                  style={{
                    display: "inline-block",
                    width: "40px",
                    height: "40px",
                    backgroundColor: bgColor,
                    border: selectedColor === color ? "3px solid black" : "1px solid gray",
                    cursor: "pointer",
                    margin: "5px",
                    borderRadius: "50%",
                  }}
                ></span>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizeOptions.length > 1 && (
        <div className="uniq-col-prod-varient">
          <div className="size-buttons">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => handleVariantSelect(selectedColor, size)}
                className={`${selectedSize === size ? "uniq-col-prod-varient-btn-select" : "uniq-col-prod-varient-btn"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className={`${matchedVariant?.availableForSale ? "uniq-col-prod-atc-btn" : "uniq-col-prod-atc-btn-others"}`}
        disabled={!matchedVariant?.availableForSale}
      >
        {matchedVariant?.availableForSale ? "Add to Cart" : "Restocking"}
      </button>
    </div>
  );
};

export default TintedTestShades;
