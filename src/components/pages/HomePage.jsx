import React from "react";
import Layout from "../Layout/Layout";
import NewlyLaunchedCollection from "../collections/NewlyLaunchedCollection";
import ImageSlider from "../snippets/ImageSlider";
import Marquee from "../snippets/Marquee";
import ScrollingText from "../snippets/ScrollingText";
import MarqueeEcoIcons from "../snippets/MarqueeEcoIcons";
import Video from "../snippets/Video";

const HomePage = () => {
  return (
    <Layout title="Home | Uniqaya Lifestyle">
      <section className="uniq-img-banner-slider-sec">
        <Video
          largeVideoSrc="https://cdn.shopify.com/videos/c/o/v/a2b0bd497d784a27b9f0e56a6454ed84.mp4"
          smallVideoSrc="https://cdn.shopify.com/videos/c/o/v/77da774c8b4944e3be56708e78b8738d.mp4"
        />
      </section>
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
      <section className="uniq-marquee-container">
        <MarqueeEcoIcons />
      </section>
    </Layout>
  );
};

export default HomePage;
