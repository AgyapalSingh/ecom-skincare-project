import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({
  children,
  title = "Uniqaya Lifestyle | Shop now",
  description = "Uniqaya's belief is that each and every God's creation is unique and we are here to inculcate healthy skin care habits with plant based ingredients to restore the beauty in you. Bridging nature and science with over 40 years of experience in the pharmaceuticals industry, to create only what's best for the skin.",
  keywords = "uniqaya, lifestyle, skincare, beauty, cosmetics, natural, organic",
  author = "Agyapal Singh",
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
