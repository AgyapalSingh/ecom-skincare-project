import React, { useEffect, useState } from "react";
import { GET_COLLECTION_NEWLY_LAUNCHED_BY_ID } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import { useCart } from "../../context/CartContext";
import UniqayaLoader from "../snippets/UniqayaLoader";
import ProductCardForCollection from "../snippets/ProductCardForCollection";

const NewlyLaunchedCollection = () => {
  const [loading, setLoading] = useState(true);
  const bestsellers = "bestsellers";
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
        <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0 justify-self-center">
          <h2 className="text-2xl font-bold text-center my-8">Best Seller</h2>
          {selectCollection.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {selectCollection.map(({ node }) => (
                <ProductCardForCollection
                  key={node.id}
                  product={node}
                  addToCart={addToCart}
                  collectionHandle={bestsellers}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No best sellers available
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default NewlyLaunchedCollection;
