import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "../snippetsCss/ProductCardForCollections.css";

const ProductCardForCollection = ({ product, collectionHandle }) => {
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
        onMouseEnter={() => secondImage && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="uniq-prod-img-div"
      >
        <img
          src={imageSrc}
          alt={product.title}
          width={"350px"}
          height={"350px"}
          onClick={() =>
            navigate(`/allcollections/${collectionHandle}/${product.handle}`)
          }
        />
      </div>
      <div className="uniq-prod-titl-pric">
        <h3
          className="uniq-prod-title"
          onClick={() =>
            navigate(`/allcollections/${collectionHandle}/${product.handle}`)
          }
        >
          {/* {product.title.substring(0, 30)}... */}
          {product.title}
        </h3>

        <p className="uniq-prod-price">
        Rs. {selectedVariant ? selectedVariant.price.amount : "N/A"}
      </p>
      </div>
    
      {variants.length > 1 && (
        <select
          className="border p-2 mt-2 rounded w-full"
          onChange={handleVariantChange}
          value={selectedVariant?.id}
        >
          {variants.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.title} - Rs. {variant.price.amount}
            </option>
          ))}
        </select>
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
        className={`mt-2 px-4 py-2 rounded text-white w-full ${
          selectedVariant?.availableForSale
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-500 cursor-not-allowed"
        }`}
        disabled={!selectedVariant?.availableForSale}
      >
        {selectedVariant?.availableForSale ? "Add to Cart" : "Restocking"}
      </button>
    </div>
  );
};

export default ProductCardForCollection;
