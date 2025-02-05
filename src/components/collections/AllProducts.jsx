import React, { useEffect, useState } from "react";
import { GET_PRODUCTS } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import { useCart } from "../../context/CartContext";
import UniqayaLoader from "../snippets/UniqayaLoader";
import { useNavigate } from "react-router-dom";
import ProductCard from "../snippets/ProductCard";

const AllProducts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  const [products, setProducts] = useState([]);

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

  return (
    <>
      {loading ? (
        <UniqayaLoader />
      ) : (
        <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0 justify-self-center">
          <h2 className="text-2xl font-bold text-center my-8">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products.map(({ node }) => (
              <ProductCard key={node.id} product={node} addToCart={addToCart} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default AllProducts;
