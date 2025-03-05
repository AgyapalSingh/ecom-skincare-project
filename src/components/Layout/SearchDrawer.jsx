import React from "react";
import { useSearch } from "../../context/SearchContext";
import { LuSearch, LuX } from "react-icons/lu";
import { Link } from "react-router-dom";

const popularKeywords = ["Tinted", "Sunscreen", "Body Butter", "De-Tan"];

const SearchDrawer = ({ isOpen, closeDrawer }) => {
  const searchContext = useSearch();

  if (!searchContext) {
    console.error(
      "Search context is not available! Make sure <SearchProvider> is wrapping the app."
    );
    return null;
  }

  const { query, setQuery, results, setResults, loading, error, search } =
    searchContext;

  const handleClose = () => {
    setQuery("");
    setResults(null);
    closeDrawer();
  };

  const handleKeywordClick = (keyword) => {
    setQuery(keyword);
    search(keyword);
  };

  return (
    <div
      className={`uniq-ag-search-drawer-container ${isOpen ? "isOpen" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`uniq-ag-serach-drawer ${isOpen ? "isOpen" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span onClick={handleClose} className="uniq-ag-serach-drawer-close-btn">
          <LuX size={28} />
        </span>

        <div className="uniq-ag-serach-drawer-header">
          <h1 className="uniq-ag-serach-drawer-title">UNIQAYA LIFESTYLES</h1>
        </div>
        <div className="uniq-ag-serach-drawer-search-container">
          <LuSearch size={24} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search(query)}
            placeholder="Search products, blogs, pages..."
            className="  "
          />
          <button onClick={() => search(query)} className="">
            Search
          </button>
        </div>

        <div className="uniq-ag-serach-drawer-pre-defined-btn">
          <span className="uniq-ag-serach-drawer-pre-defined-btn-header">
            Popular Searches :{" "}
          </span>
          {popularKeywords.map((keyword) => (
            <button
              key={keyword}
              onClick={() => handleKeywordClick(keyword)}
              className=" "
            >
              {keyword}
            </button>
          ))}
        </div>

        <div className="uniq-ag-serach-drawer-output-container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : results ? (
            <>
              <div className="uniq-ag-serach-drawer-output-products-container">
                <h3 className="uniq-ag-serach-drawer-output-products-title">Products :</h3>
                <div className="uniq-ag-serach-drawer-output-products">
                  {results?.products?.edges?.length > 0 ? (
                    results.products.edges.map(({ node }) => (
                      <Link
                        key={node.id}
                        to={`/products/${node.handle}`}
                        onClick={handleClose}
                      >
                        <div className="uniq-ag-search-product-card  ">
                          {node?.images?.edges?.length > 0 && (
                            <img
                              src={node.images.edges[0].node.url}
                              alt={node.title}
                            />
                          )}
                          <span>{node.title}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p >No products found.</p>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-4">Articles</h3>
              {results?.articles?.edges?.length > 0 ? (
                results.articles.edges.map(({ node }) => (
                  <Link
                    key={node.id}
                    to={`/blogs/${node.blog.title}/${node.handle}`}
                    className="p-2 border-b block hover:bg-gray-100"
                    onClick={handleClose}
                  >
                    {node.title}{" "}
                    <span className="text-gray-500">({node.blog.title})</span>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No articles found.</p>
              )}

              <h3 className="text-lg font-semibold mt-4">Pages</h3>
              {results?.pages?.edges?.length > 0 ? (
                results.pages.edges.map(({ node }) => (
                  <Link
                    key={node.id}
                    to={`/${node.handle}`}
                    className="p-2 border-b block hover:bg-gray-100"
                    onClick={handleClose}
                  >
                    {node.title}
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No pages found.</p>
              )}
            </>
          ) : (
            <p className=" ">Empty! Kindly Search</p>
          )}
        </div>

        <div>
          footer
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
