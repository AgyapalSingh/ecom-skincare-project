import React from "react";
import Layout from "../Layout/Layout";
import AllBlogs from "../Blogs/AllBlogs";

const AllBlogsPage = () => {
  return (
    <Layout title="Blogs | Uniqaya Lifestyle">
      <section className="uniq-ag-section-container">
        <AllBlogs />
      </section>
    </Layout>
  );
};

export default AllBlogsPage;
