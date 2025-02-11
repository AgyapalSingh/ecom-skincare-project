import React, { useEffect, useState } from "react";
import { GET_ALL_BLOGS } from "../../lib/shopify/queries";


const AllBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");

  console.log(blogs)
  const fetchAllBlogs = async () => {
    const query = { query: GET_ALL_BLOGS };
    console.log(query)
    try {
      const response = await shopifyApi.post("", query);
      console.log(response);
      const All_Blogs = response.data.blogs.edges.map((edge) => edge.node);
      console.log(All_Blogs)
      setBlogs(All_Blogs)
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <>
      <h1>Shopify Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          {blog.articles.edges.map(({ node: article }) => (
            <div key={article.id}>
              <h3>{article.title}</h3>
              {article.image && (
                <img
                  src={article.image.url}
                  alt={article.image.altText}
                  width="200"
                />
              )}
              <p>{article.excerpt}</p>
              <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
              <hr />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default AllBlogs;
