import React, { useEffect, useState } from "react";
import { GET_COLLECTIONS } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import UniqayaLoader from "../snippets/UniqayaLoader";
import { useNavigate } from "react-router-dom";
import CollectionCard from "../snippets/Cards/CollectionCard";

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

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <>
      {loading ? (
        <UniqayaLoader />
      ) : (
        <section className="uniq-allCollections">
          <h2 className="uniq-allCollections-header">
            All Collections
          </h2>
          <div className="uniq-allCollections-div">
            {collections.slice(0, visibleCount).map(({ node }) => (
              <CollectionCard key={node.id} collection={node} />
            ))}
          </div>

          {visibleCount < collections.length && (
            <div className="uniq-allCollections-loadmore">
              <button
                onClick={loadMore}
              >
                More Collections...
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default AllCollections;
