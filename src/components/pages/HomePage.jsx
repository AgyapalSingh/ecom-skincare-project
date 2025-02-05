import React from "react";
import Layout from "../Layout/Layout";
import AllProducts from "../collections/AllProducts";
import NewlyLaunchedCollection from "../collections/NewlyLaunchedCollection";

const HomePage = () => {
  return (
    <Layout title="Home | Uniqaya Lifestyle">
      {/* <NewlyLaunchedCollection/> */}
      <AllProducts />
    </Layout>
  );
};

export default HomePage;
