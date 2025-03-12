import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "../snippetsCss/ProductCard.css";

const ProductCard = ({ product, openCartDrawer }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Handle Image Hover
  const [isHovered, setIsHovered] = useState(false);
  const firstImage = product.images.edges[0]?.node.src || "default-image.jpg";
  const secondImage = product.images.edges[1]?.node.src || null;
  const imageSrc = isHovered && secondImage ? secondImage : firstImage;

  // Extract Variants and Options
  const variants = product.variants.edges.map((edge) => edge.node);
  const colorOptions = [
    ...new Set(
      variants
        .map(
          (v) => v.selectedOptions?.find((opt) => opt.name === "Color")?.value
        )
        .filter(Boolean)
    ),
  ];

  const sizeOptions = [
    ...new Set(
      variants
        .map(
          (v) => v.selectedOptions?.find((opt) => opt.name === "Size")?.value
        )
        .filter(Boolean)
    ),
  ];

  // State for selected options
  const [selectedColor, setSelectedColor] = useState(colorOptions[0] || null);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || null);

  // Find matching variant
  const selectedVariant =
    variants.find(
      (variant) =>
        variant.selectedOptions.some(
          (opt) => opt.name === "Color" && opt.value === selectedColor
        ) &&
        variant.selectedOptions.some(
          (opt) => opt.name === "Size" && opt.value === selectedSize
        )
    ) || variants[0];

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart({
        id: selectedVariant.id,
        title: `${product.title} - ${selectedVariant.title}`,
        price: selectedVariant.price.amount,
        image: product.images.edges[0]?.node.src || "default-image.jpg",
      });
      openCartDrawer();
    }
  };

  const colorMap = {
    ivorydawn: "#fdcea4",
    sunkissed: "#faaf75",
    bronzebliss: "#dd8e53",
  };

  return (
    <div key={product.id} className="uniq-prod-for-col">
      <div
        className="uniq-col-prod-img-div"
        onMouseEnter={() => secondImage && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/products/${product.handle}`)}
      >
        <img
          src={imageSrc}
          alt={product.title}
          width={"350px"}
          height={"350px"}
        />
      </div>

      <div className="uniq-col-prod-titl-pric">
        <h3
          className="uniq-col-prod-title"
          onClick={() => navigate(`/products/${product.handle}`)}
        >
          {product.title}
        </h3>
        <p className="uniq-col-prod-price">
          Rs. {selectedVariant?.price?.amount || "N/A"}
        </p>
      </div>

      {/* Color Selection (Swatches) */}
      {colorOptions.length > 1 && (
        <div className="uniq-col-prod-varient">
          <div className="color-swatches">
            {colorOptions.map((color) => {
              const bgColor = colorMap[color] || color.toLowerCase();
              return (
                <span
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    display: "inline-block",
                    width: "30px",
                    height: "30px",
                    backgroundColor: bgColor,
                    border:
                      selectedColor === color
                        ? "2px solid black"
                        : "1px solid gray",
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

      {/* Size Selection (Buttons) */}
      {sizeOptions.length > 1 && (
        <div className="uniq-col-prod-varient">
          <div className="size-buttons">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`${
                  selectedSize === size
                    ? "uniq-col-prod-varient-btn-select"
                    : "uniq-col-prod-varient-btn"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className={`${
          selectedVariant?.availableForSale
            ? "uniq-col-prod-atc-btn"
            : "uniq-col-prod-atc-btn-others"
        }`}
        disabled={!selectedVariant?.availableForSale}
      >
        {selectedVariant?.availableForSale ? "Add to Cart" : "Restocking"}
      </button>
    </div>
  );
};

export default ProductCard;
