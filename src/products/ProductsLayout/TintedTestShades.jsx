import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const TintedTestShades = ({ product, setSelectedVariant, addToCart, openCartDrawer }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract Variants
  const variants = product?.variants?.edges?.map((edge) => edge.node) || [];

  // Extract Color and Size from Title
  const colorOptions = [...new Set(variants.map((v) => v.title.split(" / ")[0]).filter(Boolean))];
  const sizeOptions = [...new Set(variants.map((v) => v.title.split(" / ")[1]).filter(Boolean))];

  // Get selected color and size from URL, fallback to first available
  const initialColor = searchParams.get("color") || colorOptions[0] || null;
  const initialSize = searchParams.get("size") || sizeOptions[0] || null;

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);

  // Find matching variant
  const matchedVariant =
    variants.find((variant) => {
      const [color, size] = variant.title.split(" / ");
      return color === selectedColor && size === selectedSize;
    }) || variants[0];

  // Update selected variant when matchedVariant changes
  useEffect(() => {
    setSelectedVariant(matchedVariant);
  }, [matchedVariant, setSelectedVariant]);

  // Update URL when user selects a new option
  const updateURL = (color, size) => {
    setSearchParams({ color, size });
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    updateURL(color, selectedSize);
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    updateURL(selectedColor, size);
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

  // Color mapping
  const colorMap = {
    ivorydawn: "#fdcea4",
    sunkissed: "#faaf75",
    bronzebliss: "#dd8e53",
  };

  return (
    <div className="bg-orange-50 p-6 rounded-lg shadow-lg">
      <h1>Tinted Test Component</h1>
      <h1 className="text-4xl font-bold text-orange-300">{product.title}</h1>
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
                  onClick={() => handleColorSelect(color)}
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
                onClick={() => handleSizeSelect(size)}
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
