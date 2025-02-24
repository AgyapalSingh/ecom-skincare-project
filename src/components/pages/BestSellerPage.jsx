import React from "react";
import Layout from "../Layout/Layout";
import BestSeller from "../collections/BestSeller";

const HomePage = () => {
  return (
    <Layout title="Best Sellers | Uniqaya Lifestyle">
      <section className=" uniq-Collection-container">
        <BestSeller />
      </section>
    </Layout>
  );
};

export default HomePage;
