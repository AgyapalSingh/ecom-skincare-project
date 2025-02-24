import React from "react";
import Layout from "../Layout/Layout";
import AllCollections from "../collections/AllCollections";

const CollectionPage = () => {
  return (
    <Layout title="All Collections | Uniqaya Lifestyle">
      <section className="uniq-Collection-container">
        <AllCollections />
      </section>
    </Layout>
  );
};

export default CollectionPage;
