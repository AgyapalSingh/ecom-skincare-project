import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { GET_PRODUCTS } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import UniqayaLoader from "../snippets/UniqayaLoader";

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
    return <Layout title={"Uniqaya Lifestyle | Shop Now"}>
      <UniqayaLoader />
    </Layout>;
  }

  if (error) {
    return <Layout title={"Uniqaya Lifestyle | Shop Now"}>{error}</Layout>;
  }

  return (
    <Layout title={"Uniqaya Lifestyle | Shop Now"}>
      <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0  justify-self-center">
        <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
          {products.map((product) => (
            <div
              key={product.node.id}
              className="product-item align-center"
            >
              <img
                src={product.node.images.edges[0]?.node.src}
                alt={product.node.images.edges[0]?.node.altText}
                className="product-image w-[200px] aspect-square  justify-self-center"
              />
              <h3>{product.node.title}</h3>
              <p>Rs. {product.node.priceRange.minVariantPrice.amount}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
