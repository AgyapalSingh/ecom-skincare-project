import React, { useEffect, useState } from "react";
import { GET_PAGINATED_ARTICLES } from "../../lib/shopify/queries";
import shopifyApi from "../../lib/shopify/shopifyApi";
import UniqayaLoader from "../snippets/UniqayaLoader";
import { GrPrevious, GrNext } from "react-icons/gr";

const AllBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [cursorStack, setCursorStack] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchArticles = async (cursor = null, isNext = true) => {
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

      if (isNext) {
        setCursorStack((prev) => [...prev, cursor]);
      } else {
        setCursorStack((prev) => prev.slice(0, -1));
      }
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
        <div className="uniq-ag-all-blogs-container">
          <h1 className="uniq-ag-all-blogs-header">Blogs</h1>

          <div className="uniq-ag-all-blogs">
            {articles.map((article) => (
              <div key={article.id} className="uniq-ag-all-blogs-card">
                <div className="relative">
                  {article.image && (
                    <img
                      src={article.image.url}
                      alt={article.image.altText}
                      className="uniq-ag-all-blogs-card-img"
                    />
                  )}
                  {article.tags?.length > 0 && (
                    <div className="uniq-ag-all-blogs-card-tag">
                      {article.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <h2 className="uniq-ag-all-blogs-card-title">{article.title}</h2>
                <div className="uniq-ag-all-blogs-card-publisher-Date">
                  <p className="uniq-ag-all-blogs-card-published-Date">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  {article.author?.name && (
                    <h3 className="uniq-ag-all-blogs-card-publisher">By {article.author.name}</h3>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="uniq-ag-all-blogs-prev-btn"
              onClick={() => fetchArticles(cursorStack[cursorStack.length - 2] || null, false)}
              disabled={cursorStack.length <= 2}
            >
              <GrPrevious />
            </button>
            <button
              className="uniq-ag-all-blogs-next-btn"
              onClick={() => fetchArticles(cursor, true)}
              disabled={!hasNextPage}
            >
              <GrNext />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AllBlogs;
