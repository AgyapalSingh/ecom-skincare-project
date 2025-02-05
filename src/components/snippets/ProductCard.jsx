import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div
      key={product.id}
      className="text-center border cursor-pointer p-4 rounded-md"
    >
      <img
        src={product.images.edges[0]?.node.src || "default-image.jpg"}
        alt={product.images.edges[0]?.node.altText || product.title}
        className="w-[200px] aspect-square mx-auto cursor-pointer"
        onClick={() => navigate(`/products/${product.handle}`)}
      />
      <h3
        className="mt-2 font-semibold cursor-pointer"
        onClick={() => navigate(`/products/${product.handle}`)}
      >
        {product.title}
      </h3>
      <p className="text-gray-600">
        Rs. {product.priceRange.minVariantPrice.amount}
      </p>
      <button
        onClick={() =>
          addToCart({
            id: product.id,
            title: product.title,
            price: product.priceRange.minVariantPrice.amount,
            image: product.images.edges[0]?.node.src,
          })
        }
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
