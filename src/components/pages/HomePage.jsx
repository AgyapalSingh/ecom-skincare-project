import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { GET_COLLECTION_BY_ID, GET_PRODUCTS } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import UniqayaLoader from "../snippets/UniqayaLoader";
import { useCart } from "../../context/CartContext"; // Import the custom hook
import BestSeller from "../collections/BestSeller";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectCollection, setSelectCollection] = useState([]);

  // Access cart state and functions from context
  const { cart, addToCart } = useCart();

  // Fetch products
  const fetchProducts = async () => {
    const query = { query: GET_PRODUCTS };
    try {
      const response = await shopifyApi.post("", query);
      const fetchedProducts = response.data.data.products.edges;
      setProducts(fetchedProducts);
    } catch (error) {
      setError("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Best Seller collection by ID
  const fetchCollectionByID = async () => {
    const query = { query: GET_COLLECTION_BY_ID };
    try {
      const response = await shopifyApi.post("", query);
      setSelectCollection(response.data.data.collection?.products?.edges || []);
    } catch (error) {
      console.error("Failed to fetch collection by ID", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCollectionByID();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <Layout title="Uniqaya Lifestyle | Shop Now">
        <UniqayaLoader />
      </Layout>
    );
  }

  // Render error state
  if (error) {
    return <Layout title="Uniqaya Lifestyle | Shop Now">{error}</Layout>;
  }

  return (
    <Layout title="Uniqaya Lifestyle | Shop Now">
      {/* Best Seller Collection Section */}
      <BestSeller />
      {/* All Products Section */}
      <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0 justify-self-center">
        <h2 className="text-2xl font-bold text-center my-8">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {products.map(({ node }) => (
            <div key={node.id} className="text-center border p-4 rounded-md">
              <img
                src={node.images.edges[0]?.node.src || "default-image.jpg"}
                alt={node.images.edges[0]?.node.altText || node.title}
                className="w-[200px] aspect-square mx-auto"
              />
              <h3 className="mt-2 font-semibold">{node.title}</h3>
              <p className="text-gray-600">
                Rs. {node.priceRange.minVariantPrice.amount}
              </p>
              <button
                onClick={() =>
                  addToCart({
                    id: node.id,
                    title: node.title,
                    price: node.priceRange.minVariantPrice.amount,
                    image: node.images.edges[0]?.node.src,
                  })
                }
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>


    </Layout>
  );
};

export default HomePage;
