import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import UniqayaLoader from "../snippets/UniqayaLoader";
import { GET_COLLECTIONS } from "../../lib/shopify/queries";

import shopifyApi from "../../lib/shopify/shopifyApi";
import AllCollections from "../collections/AllCollections";

const CollectionPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState([]);

  // Fetch collections
  const fetchCollections = async () => {
    const query = { query: GET_COLLECTIONS };
    try {
      const response = await shopifyApi.post("", query);
      const fetchedCollections = response.data.data.collections.edges;
      setCollections(fetchedCollections);
    } catch (error) {
      setError("Failed to fetch collections");
      console.error("Failed to fetch collections", error);
    } finally {
      setLoading(false); // Set loading to false after the API call finishes
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);
  if (loading) {
    return (
      <Layout title="All Collections | Uniqaya">
        <UniqayaLoader />
      </Layout>
    );
  }

  // Render error state
  if (error) {
    return <Layout title="All Collections | Uniqaya">{error}</Layout>;
  }

  return (
    <Layout title="All Collections | Uniqaya">
      <AllCollections/>
    </Layout>
  );
};

export default CollectionPage;
