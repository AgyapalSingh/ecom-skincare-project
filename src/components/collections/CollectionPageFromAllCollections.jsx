import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout"
import { GET_COLLECTION_BY_HANDLE } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import { useCart } from "../../context/CartContext";
import { useParams } from "react-router-dom";
import UniqayaLoader from "../snippets/UniqayaLoader";
import ProductCardForCollection from "../snippets/ProductCardForCollection"


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
        console.log(currentCollectionProducts);
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
    <Layout title={selectCurrentCollection ? selectCurrentCollection.title : "Uniqaya Lifestyles | Product"}>
      {loading ? (
        <UniqayaLoader />
      ) : (
       
        <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0 justify-self-center">
           <h2 className="text-2xl font-bold text-center my-8 uppercase">{handle}</h2>
          {selectCurrentCollection.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {selectCurrentCollection.map(({ node }) => (
                <ProductCardForCollection key={node.id} product={node} addToCart={addToCart} collectionHandle={handle}/>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No best sellers available
            </p>
          )}
        </section>
      )}
    </Layout>
  );
};

export default CollectionPageFromAllCollections;
