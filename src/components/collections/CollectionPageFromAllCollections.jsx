import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { GET_COLLECTION_BY_HANDLE } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import { useParams } from "react-router-dom";
import UniqayaLoader from "../snippets/UniqayaLoader";
import ProductCardForCollection from "../snippets/Cards/ProductCardForCollection";
import CartDrawer from "../Layout/CartDrawer";

const CollectionPageFromAllCollections = () => {
  const { handle } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectCurrentCollection, setSelectCurrentCollection] = useState([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const fetchCollectionByHandle = async () => {
    const query = { query: GET_COLLECTION_BY_HANDLE, variables: { handle } };
    try {
      const response = await shopifyApi.post("", query);
      const currentCollectionProducts =
        response.data.data.collectionByHandle.products?.edges;
      setSelectCurrentCollection(currentCollectionProducts || []);
    } catch (error) {
      console.error("Failed to fetch collection by ID", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectionByHandle();
  }, []);

  return (
    <Layout
      title={
        selectCurrentCollection
          ? selectCurrentCollection.title
          : "Uniqaya Lifestyles | Product"
      }
    >
      {loading ? (
        <UniqayaLoader />
      ) : (
        <section className="uniq-ag-section-container">
          <div className="uniq-collection-sec">
            <h2 className="uniq-coll-title">{handle}</h2>
            <span className="uniq-coll-nof-items">
              Total No. : {selectCurrentCollection.length}
            </span>
            <div className="uniq-coll-div">
              {selectCurrentCollection.length > 0 ? (
                <div className="uniq-coll-prods">
                  {selectCurrentCollection.map(({ node }) => (
                    <ProductCardForCollection
                      key={node.id}
                      product={node}
                      collectionHandle={handle}
                      openCartDrawer={toggleDrawer}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  No best sellers available
                </p>
              )}
            </div>
          </div>
          <CartDrawer isOpen={isDrawerOpen} closeDrawer={toggleDrawer} />
        </section>
      )}
    </Layout>
  );
};

export default CollectionPageFromAllCollections;
