export const GET_PRODUCTS = `
  {
    products(first:6) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_NAVIGATION = `
{
  menu(handle: "main-menu") {
    id
    title
    items {
      title
      url
      type
    }
  }
}`;

export const GET_COLLECTIONS = `{
  collections(first: 20) {
    edges {
      cursor
      node {
        id
        handle
        title
        description
        image {
          id
          url
        }
      }
    }
  }
}`;

export const GET_COLLECTION_BY_ID = `{
  collection(id: "gid://shopify/Collection/277059010724") {
    id
    handle
    title
    description
    image {
      id
      url
    }
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          featuredImage {
            id
            url
          }
            priceRange {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
}
`;


export const GET_PRODUCT_BY_HANDLE = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 1) {
        edges {
          node {
            src
            altText
          }
        }
      }
    }
  }
`;


export const GET_PRODUCT_BY_HANDLE_FROM_COLLECTION = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      featuredImage {
        url
        altText
      }
      priceRange {
        minVariantPrice {
          amount
        }
      }
    }
  }
`;
