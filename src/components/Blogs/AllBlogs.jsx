import React, { useEffect, useState } from "react";
import { GET_PAGINATED_ARTICLES } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import UniqayaLoader from "../snippets/UniqayaLoader";

const AllBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchArticles = async (cursor = null) => {
    setLoading(true);
    try {
      const response = await shopifyApi.post("", {
        query: GET_PAGINATED_ARTICLES,
        variables: { first: 9, after: cursor }, 
      });

      const data = response.data.data.articles;
      const newArticles = data.edges.map((edge) => edge.node);

      setArticles(newArticles);
      setCursor(data.pageInfo.endCursor); 
      setHasNextPage(data.pageInfo.hasNextPage); 
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
          <h1 className="text-3xl font-bold text-center my-6">Shopify Blogs</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="border rounded-xl p-4 shadow-lg bg-white text-center relative"
              >
                <div className="relative">
                  {article.image && (
                    <img
                      src={article.image.url}
                      alt={article.image.altText}
                      className="w-full h-48 object-cover rounded-md my-3"
                    />
                  )}
                  {article.tags?.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-semibold mt-2">{article.title}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
                {article.author?.name && (
                  <h3 className="text-sm font-medium text-gray-700 mt-2">
                    By {article.author.name}
                  </h3>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
              onClick={() => fetchArticles(null)} 
              disabled={!cursor}
            >
              First Page
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
              onClick={() => fetchArticles(cursor)}
              disabled={!hasNextPage}
            >
              Next Page
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default AllBlogs;
