import axios from "axios";

const shopifyApi = axios.create({
  baseURL: `https://${import.meta.env.VITE_SHOPIFY_APP_URL}/api/${
    import.meta.env.VITE_SHOPIFY_API_VERSION
  }/graphql.json`,

  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": import.meta.env
      .VITE_APP_SHOPIFY_PUBLIC_ACCESS_TOKEN,
  },
});

export default shopifyApi;
