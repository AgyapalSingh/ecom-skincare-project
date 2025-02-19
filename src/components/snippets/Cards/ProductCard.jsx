import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "../snippetsCss/ProductCard.css"

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // UNIQ - Change Image on Hover
  const [isHovered, setIsHovered] = useState(false);
  const firstImage = product.images.edges[0]?.node.src || "default-image.jpg";
  const secondImage = product.images.edges[1]?.node.src || null;
  const imageSrc = isHovered && secondImage ? secondImage : firstImage;

  // UNIQ - Handle variant selection
  const variants = product.variants.edges.map((edge) => edge.node);
  const [selectedVariant, setSelectedVariant] = useState(
    variants.length > 0 ? variants[0] : null
  );
  const handleVariantChange = (event) => {
    const variant = variants.find((v) => v.id === event.target.value);
    setSelectedVariant(variant);
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
          Rs. {selectedVariant ? selectedVariant.price.amount : "N/A"}
        </p>
      </div>

      {variants.length > 1 && (
        <div className="uniq-col-prod-varient">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className={` ${
                selectedVariant?.id === variant.id
                  ? "uniq-col-prod-varient-btn-select"
                  : "uniq-col-prod-varient-btn"
              }`}
            >
              {variant.title}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() =>
          selectedVariant &&
          addToCart({
            id: selectedVariant.id,
            title: `${product.title} - ${selectedVariant.title}`,
            price: selectedVariant.price.amount,
            image: firstImage,
          })
        }
        className={` ${
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
