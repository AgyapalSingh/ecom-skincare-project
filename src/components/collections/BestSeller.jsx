import React, { useEffect, useState } from "react";
import { GET_COLLECTION_BY_ID } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import UniqayaLoader from "../snippets/UniqayaLoader";
import ProductCardForCollection from "../snippets/Cards/ProductCardForCollection";
import "./collectionsCss/BestSeller.css";
import CartDrawer from "../Layout/CartDrawer";

const BestSeller = () => {
  const [loading, setLoading] = useState(true);
  const bestsellers = "bestsellers";
  const [selectCollection, setSelectCollection] = useState([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  // UNIQ - Function to Fetch Specific Collection [BestSellers]
  const fetchCollectionByID = async () => {
    const query = { query: GET_COLLECTION_BY_ID };
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

  return (
    <>
      {loading ? (
        <UniqayaLoader />
      ) : (
        <div className="uniq-collection-sec">
          <h2 className="uniq-coll-title">Best Seller</h2>
          <span className="uniq-coll-nof-items">Total No. : {selectCollection.length}</span>
          <div className="uniq-coll-div">
            {selectCollection.length > 0 ? (
              <div className="uniq-coll-prods">
                {selectCollection.map(({ node }) => (
                  <ProductCardForCollection
                    key={node.id}
                    product={node}
                    collectionHandle={bestsellers}
                    openCartDrawer={toggleDrawer}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No Best Sellers available
              </p>
            )}
          </div>
          <CartDrawer isOpen={isDrawerOpen} closeDrawer={toggleDrawer} />
        </div>
      )}
    </>
  );
};

export default BestSeller;
