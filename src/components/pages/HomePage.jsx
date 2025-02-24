import React from "react";
import Layout from "../Layout/Layout";
import NewlyLaunchedCollection from "../collections/NewlyLaunchedCollection";
import ImageSlider from "../snippets/ImageSlider";
import Marquee from "../snippets/Marquee";

const HomePage = () => {
  return (
    <Layout title="Home | Uniqaya Lifestyle">
      <section className="uniq-img-banner-slider-sec"> 
        <ImageSlider />
      </section>
      <section className="uniq-newlyLaunched-sec uniq-home-container">
        <NewlyLaunchedCollection />
      </section>
      <section className="uniq-marquee-sec uniq-home-container">
        <Marquee />
      </section>
    </Layout>
  );
};

export default HomePage;
