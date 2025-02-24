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
        <div className="uniq-allCollections">
          <h2 className="uniq-allCollections-header">All Products</h2>
          <div className="uniq-allCollections-div">
            {products.slice(0, visibleCount).map(({ node }) => (
              <ProductCard key={node.id} product={node} />
            ))}
          </div>
          {visibleCount < products.length && (
            <div className="uniq-allCollections-loadmore">
              <button onClick={loadMore}>Load More...</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllProducts;
