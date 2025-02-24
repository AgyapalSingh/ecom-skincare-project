import React from "react";

const Retinol = ({
  product,
  selectedVariant,
  setSelectedVariant,
  addToCart,
}) => {
  return (
    <div className="bg-orange-50 p-6 rounded-lg shadow-lg">
      <h1>Retinol Component</h1>
      <h1 className="text-4xl font-bold text-orange-700">{product.title}</h1>
      <p className="text-gray-600 mt-2">
        Rs.{" "}
        {selectedVariant
          ? selectedVariant.price.amount
          : product.priceRange.minVariantPrice.amount}
      </p>

      <img
        src={product.images.edges[0]?.node.src || "default-image.jpg"}
        alt={product.images.edges[0]?.node.altText || product.title}
        className="w-full max-w-sm mt-4 rounded-md"
      />

      <p className="text-gray-800 mt-4">{product.description}</p>

      {product.variants.edges.length > 1 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {product.variants.edges.map(({ node: variant }) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className={`px-4 py-2 rounded border ${
                selectedVariant?.id === variant.id
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {variant.title} - Rs. {variant.price.amount}
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

export default Retinol;
