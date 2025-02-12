import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ProductPageLoader from "../components/snippets/ProductPageLoader";
import { useParams } from "react-router-dom";
import shopifyApi from "../lib/shopify/shopifyApi";
import { useCart } from "../context/CartContext";
import { GET_PRODUCT_BY_HANDLE } from "../lib/shopify/queries";

const ProductPage = () => {
  const { handle } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await shopifyApi.post("", {
        query: GET_PRODUCT_BY_HANDLE,
        variables: { handle },
      });
      const fetchedProduct = response.data.data.productByHandle;
      setProduct(fetchedProduct);

      if (fetchedProduct.variants.edges.length > 0) {
        setSelectedVariant(fetchedProduct.variants.edges[0].node);
      }
    } catch (error) {
      setError("Failed to fetch product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
                Rs.{" "}
                {selectedVariant
                  ? selectedVariant.price.amount
                  : product.priceRange.minVariantPrice.amount}
              </p>
              <p className="text-gray-700">{product.description}</p>

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
                className={`mt-4 px-6 py-3 rounded text-white w-full ${
                  selectedVariant?.availableForSale
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
                disabled={!selectedVariant?.availableForSale}
              >
                {selectedVariant?.availableForSale
                  ? "Add to Cart"
                  : "Restocking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductPage;
