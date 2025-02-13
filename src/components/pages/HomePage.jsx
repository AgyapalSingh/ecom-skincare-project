import React from "react";
import Layout from "../Layout/Layout";
import AllProducts from "../collections/AllProducts";
import NewlyLaunchedCollection from "../collections/NewlyLaunchedCollection";
import ImageSlider from "../snippets/ImageSlider";
import { motion, useScroll } from 'framer-motion';

const HomePage = () => {
  const {scrollYProgress} = useScroll();
  return (
    <Layout title="Home | Uniqaya Lifestyle">
      <motion.div
      style={{
        scaleX:scrollYProgress,
      }} className="scroll-bar-progress">

      </motion.div>
      <ImageSlider />

      <div className="uniq-home-container">
        <NewlyLaunchedCollection />
      </div>
      <AllProducts />
    </Layout>
  );
};

export default HomePage;
