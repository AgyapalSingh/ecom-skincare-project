import React, { useEffect, useState } from "react";
import { GET_COLLECTIONS } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import UniqayaLoader from "../snippets/UniqayaLoader";


const AllCollections = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState([]);

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

  return (
    <>
      {loading ? (
        <UniqayaLoader />
      ) : (
      <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0 justify-self-center">
        <h2 className="text-2xl font-bold text-center my-8">All Collections</h2>
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
      )}
    </>
  );
};

export default AllCollections;
