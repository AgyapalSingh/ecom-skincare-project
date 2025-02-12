import React, { useEffect, useState } from "react";
import { GET_COLLECTION_NEWLY_LAUNCHED_BY_ID } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import { useCart } from "../../context/CartContext";
import UniqayaLoader from "../snippets/UniqayaLoader";
import ProductCardForCollection from "../snippets/ProductCardForCollection";

const NewlyLaunchedCollection = () => {
  const [loading, setLoading] = useState(true);
  const newlylaunched = "newly-launched";
  const { cart, addToCart } = useCart();
  const [selectCollection, setSelectCollection] = useState([]);

  const fetchCollectionByID = async () => {
    const query = { query: GET_COLLECTION_NEWLY_LAUNCHED_BY_ID };
    try {
      const response = await shopifyApi.post("", query);
      const bestSellerProducts = response.data.data.collection?.products?.edges;
      setSelectCollection(bestSellerProducts || []);
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
                    addToCart={addToCart}
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
