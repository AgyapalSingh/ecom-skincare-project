import React, { createContext, useState, useContext } from "react";
import shopifyApi from "../lib/shopify/shopifyApi";
import { SEARCH_QUERY } from "../lib/shopify/queries";

const SearchContext = createContext();

const fetchSearchResults = async (searchQuery) => {
  if (!searchQuery.trim()) return { products: [], articles: [], pages: [] };

  try {
    const response = await shopifyApi.post("", {
      query: SEARCH_QUERY,
      variables: { query: searchQuery },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return { error: "Failed to fetch search results" };
  }
};

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    setLoading(true);
    setError(null);
    try {
      // Perform your Shopify Storefront API search here
      const response = await fetchSearchResults(query);
      setResults(response);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{ query, setQuery, results, setResults, loading, error, search }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom Hook
export const useSearch = () => {
  return useContext(SearchContext);
};
