import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import {
  GET_COLLECTION_BY_ID,
  GET_COLLECTIONS,
  GET_PRODUCTS,
} from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import UniqayaLoader from "../snippets/UniqayaLoader";
import { useCart } from "../../context/CartContext"; // Import the custom hook

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
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

  // Fetch collections
  const fetchCollections = async () => {
    const query = { query: GET_COLLECTIONS };
    try {
      const response = await shopifyApi.post("", query);
      setCollections(response.data.data.collections.edges);
    } catch (error) {
      console.error("Failed to fetch collections", error);
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
    fetchCollections();
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
      {/* All Products Section */}
      <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0">
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
              <p className="text-gray-600">Rs. {node.priceRange.minVariantPrice.amount}</p>
              <button
                onClick={() => addToCart({ id: node.id, title: node.title, price: node.priceRange.minVariantPrice.amount , image: node.images.edges[0]?.node.src})}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Collections Section */}
      <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-2xl font-bold text-center my-8">Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {collections.map(({ node }) => (
            <div key={node.id} className="text-center border p-4 rounded-md">
              <img
                src={node.image?.url || "default-image.jpg"}
                alt={node.image?.altText || node.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold">{node.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Best Seller Collection Section */}
      <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-2xl font-bold text-center my-8">Best Seller</h2>
        {selectCollection.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {selectCollection.map(({ node }) => (
              <div key={node.id} className="text-center border p-4 rounded-md">
                <img
                  src={node.featuredImage.url || "default-image.jpg"}
                  alt={node.images?.edges[0]?.node?.altText || node.title}
                  className="w-[200px] aspect-square mx-auto"
                />
                <h3 className="text-lg font-semibold">{node.title}</h3>
                <button
                  onClick={() => addToCart({ id: node.id, title: node.title, price: node.priceRange?.minVariantPrice?.amount , image: node.featuredImage.url})}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No best sellers available</p>
        )}
      </section>
    </Layout>
  );
};

export default HomePage;
