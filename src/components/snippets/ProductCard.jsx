import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const variants = product.variants.edges.map((edge) => edge.node);

  const [selectedVariant, setSelectedVariant] = useState(
    variants.length > 0 ? variants[0] : null
  );

  const handleVariantChange = (event) => {
    const variant = variants.find((v) => v.id === event.target.value);
    setSelectedVariant(variant);
  };

  return (
    <div
      key={product.id}
      className="text-center border cursor-pointer p-4 rounded-md"
    >
      <div className="aspect-square mx-auto cursor-pointer">
        <img
          src={product.images.edges[0]?.node.src || "default-image.jpg"}
          alt={product.images.edges[0]?.node.altText || product.title}
          width={"100%"}
          height={"100%"}
          onClick={() => navigate(`/products/${product.handle}`)}
        />
      </div>
      <h3
        className="mt-2 font-semibold cursor-pointer"
        onClick={() => navigate(`/products/${product.handle}`)}
      >
        {product.title}
      </h3>
      <p className="text-gray-600">
        Rs. {selectedVariant ? selectedVariant.price.amount : "N/A"}
      </p>

      {/* {variants.length > 1 && ( // Show dropdown only if there are multiple variants
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
      )} */}

      {variants.length > 1 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className={`px-4 py-2 rounded border ${
                selectedVariant?.id === variant.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
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
            image: product.images.edges[0]?.node.src,
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

export default ProductCard;
