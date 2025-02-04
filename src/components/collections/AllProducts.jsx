import React, { useEffect, useState } from "react";
import { GET_PRODUCTS } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  // Access cart state and functions from context
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [products, setProducts] = useState([]);

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
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      {/* All Products Section */}
      <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0 justify-self-center">
        <h2 className="text-2xl font-bold text-center my-8">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {products.map(({ node }) => (
            <div
              key={node.id}
              className="text-center border cursor-pointer p-4 rounded-md"
            >
              <img
                src={node.images.edges[0]?.node.src || "default-image.jpg"}
                alt={node.images.edges[0]?.node.altText || node.title}
                className="w-[200px] aspect-square mx-auto cursor-pointer"
                onClick={() => navigate(`/products/${node.handle}`)}
              />
              <h3
                className="mt-2 font-semibold cursor-pointer"
                onClick={() => navigate(`/products/${node.handle}`)}
              >
                {node.title}
              </h3>
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
    </div>
  );
};

export default AllProducts;
