import React from "react";
import Layout from "../Layout/Layout";
import NewlyLaunchedCollection from "../collections/NewlyLaunchedCollection";
import ImageSlider from "../snippets/ImageSlider";
import Marquee from "../snippets/Marquee";
import ScrollingText from "../snippets/ScrollingText";

const HomePage = () => {
  return (
    <Layout title="Home | Uniqaya Lifestyle">
      <section className="uniq-img-banner-slider-sec"> 
        <ImageSlider />
      </section>
      <section className="uniq-newlyLaunched-sec uniq-home-container">
        <NewlyLaunchedCollection />
      </section>
      <section className="uniq-marquee-container">
        <Marquee />
      </section>
      <section className="uniq-marquee-container">
        <ScrollingText />
      </section>
    </Layout>
  );
};

export default HomePage;
