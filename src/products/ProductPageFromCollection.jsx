import React, { useEffect, useState } from "react";
import { GET_PRODUCT_BY_HANDLE_FROM_COLLECTION } from "../lib/shopify/queries";
import shopifyApi from "../lib/shopify/shopifyApi";
import { useCart } from "../context/CartContext";
import { useParams } from "react-router-dom";
import UniqayaLoader from "../components/snippets/UniqayaLoader";

const ProductPageFromCollection = () => {
  const { handle } = useParams(); // Get the handle from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [error, setError] = useState(null);

  const fetchProductByHandle = async () => {
    const query = { query: GET_PRODUCT_BY_HANDLE_FROM_COLLECTION, variables: { handle } };
    try {
      const response = await shopifyApi.post("", query);
      setProduct(response.data.data.productByHandle || null);
    } catch (error) {
      console.error("Failed to fetch product by handle", error);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductByHandle();
  }, [handle]);

  if (loading) {
    return <UniqayaLoader />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-gray-500">Product not found</p>;
  }

  return (
    <div>
      <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0 justify-self-center">
        <h2 className="text-2xl font-bold text-center my-8">{product.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              className="w-full h-auto"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-gray-600 text-xl mb-4">
              Rs. {product.priceRange.minVariantPrice.amount}
            </p>
            <p className="text-gray-700">{product.description}</p>
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.priceRange.minVariantPrice.amount,
                  image: product.featuredImage.url,
                })
              }
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPageFromCollection;
