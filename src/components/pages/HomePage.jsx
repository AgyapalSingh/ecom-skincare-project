import React from "react";
import Layout from "../Layout/Layout";
import AllProducts from "../collections/AllProducts";

const HomePage = () => {
  return (
    <Layout title="Home | Uniqaya Lifestyle">
      <AllProducts />
    </Layout>
  );
};

export default HomePage;
