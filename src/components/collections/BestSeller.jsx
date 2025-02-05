import React, { useEffect, useState } from "react";
import { GET_COLLECTION_BY_ID } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import { useCart } from "../../context/CartContext";
import UniqayaLoader from "../snippets/UniqayaLoader";
import { useNavigate } from "react-router-dom";

const BestSeller = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart } = useCart();

  const [selectCollection, setSelectCollection] = useState([]);

  const fetchCollectionByID = async () => {
    const query = { query: GET_COLLECTION_BY_ID };
    try {
      const response = await shopifyApi.post("", query);
      setSelectCollection(response.data.data.collection?.products?.edges || []);
      console.log(response.data.data.collection?.products?.edges );
    } catch (error) {
      console.error("Failed to fetch collection by ID", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectionByID();
  }, []);

  if (loading) {
    return <UniqayaLoader />;
  }

  return (
    <div>
      <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0 justify-self-center">
        <h2 className="text-2xl font-bold text-center my-8">Best Seller</h2>
        {selectCollection.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {selectCollection.map(({ node }) => (
              <div key={node.id} className="text-center border p-4 rounded-md">
                <img
                  src={node.featuredImage.url || "default-image.jpg"}
                  alt={node.images?.edges[0]?.node?.altText || node.title}
                  className="w-[200px] aspect-square mx-auto"
                  onClick={() => navigate(`/collections/products/${node.handle}`)}
                />
                <h3
                  className="text-lg font-semibold"
                  onClick={() => navigate(`/collections/products/${node.handle}`)}
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
                      price: node.priceRange?.minVariantPrice?.amount,
                      image: node.featuredImage.url,
                    })
                  }
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
    </div>
  );
};

export default BestSeller;
