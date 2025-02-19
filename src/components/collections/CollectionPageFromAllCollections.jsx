import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { GET_COLLECTION_BY_HANDLE } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import { useCart } from "../../context/CartContext";
import { useParams } from "react-router-dom";
import UniqayaLoader from "../snippets/UniqayaLoader";
import ProductCardForCollection from "../snippets/Cards/ProductCardForCollection";

const CollectionPageFromAllCollections = () => {
  const { handle } = useParams();

  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  const [selectCurrentCollection, setSelectCurrentCollection] = useState([]);

  const fetchCollectionByHandle = async () => {
    try {
      const query = { query: GET_COLLECTION_BY_HANDLE, variables: { handle } };
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
        <section className="uniq-collection-sec">
          <h2 className="uniq-coll-title">{handle}</h2>
          <span>Total No. : {selectCurrentCollection.length}</span>
          <div className="uniq-coll-div">
            {selectCurrentCollection.length > 0 ? (
              <div className="uniq-coll-prods">
                {selectCurrentCollection.map(({ node }) => (
                  <ProductCardForCollection
                    key={node.id}
                    product={node}
                    addToCart={addToCart}
                    collectionHandle={handle}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No best sellers available
              </p>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default CollectionPageFromAllCollections;
