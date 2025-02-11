import React from "react";
import { useSearch } from "../../context/SearchContext";
import { LuSearch, LuX } from "react-icons/lu";
import { Link } from "react-router-dom";

const SearchDrawer = ({ isOpen, closeDrawer }) => {
  const { query, setQuery, results, loading, error, search } = useSearch();

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-white shadow-lg z-50 p-6 transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Close Button */}
      <button onClick={closeDrawer} className="absolute top-4 right-6 text-3xl">
        <LuX size={28} />
      </button>

      {/* Search Input */}
      <div className="flex items-center gap-2 border-b pb-2 mt-12">
        <LuSearch size={24} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search(query)}
          placeholder="Search products, blogs, pages..."
          className="w-full p-2 text-lg focus:outline-none"
        />
        <button
          onClick={() => search(query)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      <div className="mt-4 overflow-y-auto max-h-[70vh]">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : results ? (
          <>
            {/* Products */}
            <h3 className="text-lg font-semibold mt-4">Products</h3>
            {results.products.edges.length > 0 ? (
              results.products.edges.map(({ node }) => (
                <Link
                  key={node.id}
                  to={`/products/${node.handle}`}
                  className="p-2 border-b block hover:bg-gray-100"
                  onClick={closeDrawer}
                >
                  <div className="flex items-center gap-3">
                    {node.images.edges.length > 0 && (
                      <img
                        src={node.images.edges[0].node.url}
                        alt={node.title}
                        className="w-12 h-12 object-cover"
                      />
                    )}
                    <span>{node.title}</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No products found.</p>
            )}

            {/* Blogs */}
            <h3 className="text-lg font-semibold mt-4">Articles</h3>
            {results.articles.edges.length > 0 ? (
              results.articles.edges.map(({ node }) => (
                <Link
                  key={node.id}
                  to={`/blogs/${node.blog.title}/${node.handle}`}
                  className="p-2 border-b block hover:bg-gray-100"
                  onClick={closeDrawer}
                >
                  {node.title} <span className="text-gray-500">({node.blog.title})</span>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No articles found.</p>
            )}

            {/* Pages */}
            <h3 className="text-lg font-semibold mt-4">Pages</h3>
            {results.pages.edges.length > 0 ? (
              results.pages.edges.map(({ node }) => (
                <Link
                  key={node.id}
                  to={`/${node.handle}`}
                  className="p-2 border-b block hover:bg-gray-100"
                  onClick={closeDrawer}
                >
                  {node.title}
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No pages found.</p>
            )}
          </>
        ) : (
          <p className="text-gray-500 mt-4">Type to search...</p>
        )}
      </div>
    </div>
  );
};

export default SearchDrawer;
