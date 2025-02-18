import React from "react";
import Layout from "../Layout/Layout";
import AllProducts from "../collections/AllProducts";
import NewlyLaunchedCollection from "../collections/NewlyLaunchedCollection";
import ImageSlider from "../snippets/ImageSlider";

const HomePage = () => {
  return (
    <Layout title="Home | Uniqaya Lifestyle">
      <ImageSlider />

      <div className="uniq-home-container">
        <NewlyLaunchedCollection />
      </div>
      <AllProducts />
    </Layout>
  );
};

export default HomePage;
