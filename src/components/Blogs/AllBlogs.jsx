import React, { useEffect, useState } from "react";
import { GET_ALL_ARTICLES } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi"; // Ensure this is correctly configured
import UniqayaLoader from "../snippets/UniqayaLoader";

const AllBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  const fetchArticles = async () => {
    try {
      const response = await shopifyApi.post("", { query: GET_ALL_ARTICLES });
      const fetchedArticles = response.data.data.articles.edges.map(
        (edge) => edge.node
      );
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

  return (
    <>
      {loading ? (
        <UniqayaLoader />
      ) : (
        <section className="max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-0 justify-self-center">
          <h1 className="text-3xl font-bold text-center my-6 ">Shopify Blogs</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="border rounded-xl p-4 shadow-lg bg-white text-center"
              >
              
                {article.image && (
                  <img
                    src={article.image.url}
                    alt={article.image.altText}
                    className="w-full h-48 object-cover rounded-md my-3"
                  />
                )}
                <h2 className="text-xl font-semibold">{article.title}</h2>
                {article.tags && (
                  <p className="text-xs text-gray-600 my-1">
                    {article.tags.join(", ")}
                  </p>
                )}
                <h3 className="text-sm font-medium">{article.author?.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "short", 
                    day: "2-digit",
                    year: "numeric", 
                  })}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default AllBlogs;
