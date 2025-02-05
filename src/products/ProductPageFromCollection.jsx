import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ProductPageLoader from "../components/snippets/ProductPageLoader";
import { useParams } from "react-router-dom";
import shopifyApi from "../lib/shopify/shopifyApi";
import { useCart } from "../context/CartContext";
import { GET_PRODUCT_BY_HANDLE_FROM_COLLECTION } from "../lib/shopify/queries";

const ProductPageFromCollection = () => {
  const { handle } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductByHandle = async () => {
    try {
      const query = {
        query: GET_PRODUCT_BY_HANDLE_FROM_COLLECTION,
        variables: { handle },
      };
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

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Layout title={product ? product.title : "Uniqaya Lifestyles | Product"}>
      {loading ? (
        <ProductPageLoader />
      ) : (
        <div className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              className="w-full max-w-md mx-auto rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p className="text-gray-600 my-4">
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
        </div>
      )}
    </Layout>
  );
};

export default ProductPageFromCollection;
