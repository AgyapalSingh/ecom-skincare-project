import React, { useEffect, useState } from "react";
import { GET_PRODUCTS } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import UniqayaLoader from "../snippets/UniqayaLoader";
import ProductCard from "../snippets/Cards/ProductCard";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // UNIQ - Function to Fetch All Products
  const fetchProducts = async () => {
    const query = { query: GET_PRODUCTS };
    try {
      const response = await shopifyApi.post("", query);
      const fetchedProducts = response.data.data.products.edges;
      setProducts(fetchedProducts);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <>
      {loading ? (
        <UniqayaLoader />
      ) : (
        <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0 justify-self-center">
          <h2 className="text-2xl font-bold text-center my-8">All Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products.slice(0, visibleCount).map(({ node }) => (
              <ProductCard key={node.id} product={node} />
            ))}
          </div>

          {visibleCount < products.length && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default AllProducts;