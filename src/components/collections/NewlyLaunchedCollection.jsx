import React, { useEffect, useState } from "react";
import { GET_COLLECTION_NEWLY_LAUNCHED_BY_ID } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import UniqayaLoader from "../snippets/UniqayaLoader";
import ProductCardForCollection from "../snippets/Cards/ProductCardForCollection";

const NewlyLaunchedCollection = () => {
  const [loading, setLoading] = useState(true);
  const newlylaunched = "newly-launched";
  const [selectCollection, setSelectCollection] = useState([]);

  // UNIQ - Function to Fetch Specific Collection [Newly Launched]
  const fetchCollectionByID = async () => {
    const query = { query: GET_COLLECTION_NEWLY_LAUNCHED_BY_ID };
    try {
      const response = await shopifyApi.post("", query);
      const newlyLaunchedProducts =
        response.data.data.collection?.products?.edges;
      setSelectCollection(newlyLaunchedProducts || []);
    } catch (error) {
      console.error("Failed to fetch collection by ID", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectionByID();
  }, []);

  return (
    <>
      {loading ? (
        <UniqayaLoader />
      ) : (
        <section className="uniq-collection-sec">
          <h2 className="uniq-coll-title">Newly Launched</h2>
          <div className="uniq-coll-div">
            {selectCollection.length > 0 ? (
              <div className="uniq-coll-prods">
                {selectCollection.map(({ node }) => (
                  <ProductCardForCollection
                    key={node.id}
                    product={node}
                    collectionHandle={newlylaunched}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No Newly Launched available
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default NewlyLaunchedCollection;
