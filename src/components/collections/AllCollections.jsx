import React, { useEffect, useState } from "react";
import { GET_COLLECTIONS } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import UniqayaLoader from "../snippets/UniqayaLoader";
import { useNavigate } from "react-router-dom";

const AllCollections = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // UNIQ - Function to Fetch All Collections
  const fetchCollections = async () => {
    const query = { query: GET_COLLECTIONS };
    try {
      const response = await shopifyApi.post("", query);
      const fetchedCollections = response.data.data.collections.edges;
      setCollections(fetchedCollections);
    } catch (error) {
      setError("Failed to fetch collections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const loadMore = () =>{
    setVisibleCount((prevCount) => prevCount + 6);
  }

  return (
    <>
      {loading ? (
        <UniqayaLoader />
      ) : (
        <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0 justify-self-center">
          <h2 className="text-2xl font-bold text-center my-8">
            All Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {collections.slice(0, visibleCount).map(({ node }) => (
              <div
                key={node.id}
                className="text-center border p-4 rounded-md cursor-pointer"
                onClick={() => navigate(`/allcollections/${node.handle}`)}
              >
                <img
                  src={node.image?.url || "default-image.jpg"}
                  alt={node.image?.altText || node.title}
                  className="w-full h-40 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold">{node.title}</h3>
              </div>
            ))}
          </div>

          {visibleCount < collections.length && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
              >
                More Collections
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default AllCollections;
