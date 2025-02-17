import React from "react";

const DefaultLayout = ({ product, selectedVariant, setSelectedVariant, addToCart }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
      <p className="text-gray-600 mt-2">Rs. {selectedVariant ? selectedVariant.price.amount : product.priceRange.minVariantPrice.amount}</p>

      <img
        src={product.images.edges[0]?.node.src || "default-image.jpg"}
        alt={product.images.edges[0]?.node.altText || product.title}
        className="w-full max-w-sm mt-4 rounded-md"
      />

      <p className="text-gray-700 mt-4">{product.description}</p>

      {product.variants.edges.length > 1 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {product.variants.edges.map(({ node: variant }) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className={`px-4 py-2 rounded border ${
                selectedVariant?.id === variant.id
                  ? "bg-blue-600 text-white"
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

export default DefaultLayout;
