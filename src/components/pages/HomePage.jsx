import React from "react";
import Layout from "../Layout/Layout";
import NewlyLaunchedCollection from "../collections/NewlyLaunchedCollection";
import ImageSlider from "../snippets/ImageSlider";
import Marquee from "../snippets/Marquee";
import ScrollingText from "../snippets/ScrollingText";
import MarqueeEcoIcons from "../snippets/MarqueeEcoIcons";
import Video from "../snippets/Video";
import Image from "../snippets/Image";

const HomePage = () => {
  return (
    <Layout title="Home | Uniqaya Lifestyle">
      <section className="uniq-img-banner-slider-sec">
        <ImageSlider />
      </section>

      <section className="uniq-newlyLaunched-sec">
        <NewlyLaunchedCollection />
      </section>

      <section className="uniq-marquee-container">
        <Marquee />
      </section>

      <section className="uniq-video-highlight">
        <Video
          largeVideoSrc="https://cdn.shopify.com/videos/c/o/v/a2b0bd497d784a27b9f0e56a6454ed84.mp4"
          smallVideoSrc="https://cdn.shopify.com/videos/c/o/v/77da774c8b4944e3be56708e78b8738d.mp4"
        />
      </section>

      <section className="uniq-marquee-container">
        <ScrollingText />
      </section>

      <section className="uniq-image-highlight">
        <Image
          largeImageSrc="https://cdn.shopify.com/s/files/1/0589/0192/1956/files/DeTan_banner.jpg?v=1725971111"
          smallImageSrc="https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Detan_Mobile.jpg?v=1726119567"
        />
      </section>

      <section className="uniq-marquee-container">
        <MarqueeEcoIcons />
      </section>
    </Layout>
  );
};

export default HomePage;
