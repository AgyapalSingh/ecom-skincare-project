import React,  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCardForCollection = ({ product, collectionHandle}) => {
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
      <img
        src={product.featuredImage.url}
        alt={product.featuredImage.altText || product.title}
        className="w-[200px] aspect-square mx-auto cursor-pointer"
        onClick={() => navigate(`/allcollections/${collectionHandle}/${product.handle}`)}
      />
      <h3
        className="mt-2 font-semibold cursor-pointer"
        onClick={() => navigate(`/allcollections/${collectionHandle}/${product.handle}`)}
      >
        {product.title}
      </h3>
      <p className="text-gray-600">
        Rs. {selectedVariant ? selectedVariant.price.amount : "N/A"}
      </p>
      {variants.length > 1 && ( // Show dropdown only if there are multiple variants
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
            image: product.featuredImage.url,
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
