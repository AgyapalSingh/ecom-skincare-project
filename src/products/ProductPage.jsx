import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ProductPageLoader from "../components/snippets/ProductPageLoader"
import { useParams } from "react-router-dom";
import shopifyApi from "../lib/shopify/shopifyApi";
import { useCart } from "../context/CartContext";
import { GET_PRODUCT_BY_HANDLE } from "../lib/shopify/queries";

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const { handle } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await shopifyApi.post("", {
          query: GET_PRODUCT_BY_HANDLE,
          variables: { handle },
        });
        setProduct(response.data.data.productByHandle);
      } catch (error) {
        setError("Failed to fetch product");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
              src={product.images.edges[0]?.node.src || "default-image.jpg"}
              alt={product.images.edges[0]?.node.altText || product.title}
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
                    image: product.images.edges[0]?.node.src,
                  })
                }
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
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

export default ProductPage;
