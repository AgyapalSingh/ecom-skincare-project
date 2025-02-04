import React from "react";
import Layout from "../Layout/Layout";
import BestSeller from "../collections/BestSeller";
import AllProducts from "../collections/AllProducts";

const HomePage = () => {
  return (
    <Layout title="Home | Uniqaya Lifestyle">
      <AllProducts/>
      <BestSeller />
    </Layout>
  );
};

export default HomePage;
