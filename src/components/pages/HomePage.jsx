import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { GET_PRODUCTS } from "../../lib/shopify/queries";
import  shopifyApi  from "../../lib/shopify/shopifyApi";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch products
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

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Render loading, error, or product list
  if (loading) {
    return <Layout title={"Uniqaya Lifestyle | Shop Now"}>Loading...</Layout>;
  }

  if (error) {
    return <Layout title={"Uniqaya Lifestyle | Shop Now"}>{error}</Layout>;
  }

  return (
    <Layout title={"Uniqaya Lifestyle | Shop Now"}>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.node.id} className="product-item">
            <h3>{product.node.title}</h3>
            <p>{product.node.descriptionHtml}</p>
            <img
              style={{ width: "200px" }}
              src={product.node.images.edges[0]?.node.src}
              alt={product.node.images.edges[0]?.node.altText}
              className="product-image"
            />
            <p>Price: ${product.node.priceRange.minVariantPrice.amount}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
