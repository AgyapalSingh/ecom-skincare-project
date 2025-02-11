import React, { useEffect, useState } from "react";
import { GET_ALL_ARTICLES } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi"; // Ensure this is correctly configured

const AllBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  const fetchArticles = async () => {
    try {
      const response = await shopifyApi.post("", { query: GET_ALL_ARTICLES });

      console.log("API Response:", response.data); // Debugging log

      const fetchedArticles = response.data.data.articles.edges.map(edge => edge.node);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Shopify Blogs</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <h4>Blog: {article.blog?.title}</h4>
          {article.image && (
            <img src={article.image.url} alt={article.image.altText} width="200" />
          )}
          
          <hr />
        </div>
      ))}
    </>
  );
};

export default AllBlogs;
