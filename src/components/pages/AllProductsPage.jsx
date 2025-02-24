import React from "react";
import Layout from "../Layout/Layout";
import AllProducts from "../collections/AllProducts";

const AllProductsPage = () => {
  return (
    <Layout title="All Products | Uniqaya Lifestyle">
      <section className=" uniq-Collection-container">
        <AllProducts />
      </section>
    </Layout>
  );
};

export default AllProductsPage;
