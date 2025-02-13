import React from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll } from 'framer-motion';

const Layout = ({
  children,
  title = "Uniqaya Lifestyle - Clean and Functional Skincare",
  description = "Uniqaya's belief is that each and every God's creation is unique and we are here to inculcate healthy skin care habits with plant based ingredients to restore the beauty in you. Bridging nature and science with over 40 years of experience in the pharmaceuticals industry, to create only what's best for the skin.",
  keywords = "uniqaya, lifestyle, skincare, beauty, cosmetics, natural, organic",
  author = "Agyapal Singh",
}) => {
  const {scrollYProgress} = useScroll();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <motion.div
        style={{
          scaleX: scrollYProgress,
        }}
        className="scroll-bar-progress"
      ></motion.div>
      <main style={{ minHeight: "70vh", marginTop: "110px" }}>{children}</main>
    </>
  );
};

export default Layout;
