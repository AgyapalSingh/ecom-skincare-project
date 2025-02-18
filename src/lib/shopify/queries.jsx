// 1. QUERY TO FETCH ALL PRODUCTS
export const GET_PRODUCTS = `
  {
    products(first: 70) {
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
          images(first: 2) {
            edges {
              node {
                src
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

// 2. QUERY TO FETCH ALL COLLECTIONS
export const GET_COLLECTIONS = `{
  collections(first: 100) {
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

// 3. QUERY TO FETCH A SPECIFIC COLLECTION BY COLLECTION ID
// BestSellers Collection
const BEST_SELLERS_GID = import.meta.env.VITE_BEST_SELLERS_GID
export const GET_COLLECTION_BY_ID = `{
  collection(id: "${BEST_SELLERS_GID}") {
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

          variants(first: 10) {  
              edges {
                node {
                  id
                  title
                  availableForSale  
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
        }
      }
    }
  }
}
`;


// 3. QUERY TO FETCH A SPECIFIC COLLECTION BY COLLECTION ID
// BestSellers Collection
const NEWLY_LAUNCHED_GID = import.meta.env.VITE_NEWLY_LAUNCHED_GID
export const GET_COLLECTION_NEWLY_LAUNCHED_BY_ID = `{
  collection(id: "${NEWLY_LAUNCHED_GID}") {
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
            variants(first: 10) {  
              edges {
                node {
                  id
                  title
                  availableForSale  
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
        }
      }
    }
  }
}
`;

// 4. QUERY TO FETCH PRODUCT FROM HANDLE
// [USED TO CREATE DYNAMIC PRODUCT PAGE FOR ALL PRODUCTS WHEN PRODUCT IS CLICKED FROM ALL PRODUCTS]
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
        variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                }
              }
            }
          }
    }
  }
`;

// 5. QUERY TO FETCH PRODUCT FROM HANDLE
// [ALSO USED TO CREATE DYNAMIC PRODUCT PAGE - BUT DIFFERENCE IS WHEN PRODUCT IS CLICKED FROM COLLECTION]
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
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale 
            price {
              amount
            }
          }
        }
      }
    }
  }
`;

// 6. QUERY TO FETCH A SPECIFIC COLLECTION BY COLLECTION HANDLE
// [USED TO CREATE DYNAMIC COLLECTION PAGE FOR ALL COLLECTIONS WHEN THEY ARE CLICKED FROM ALL COLLECTION PAGE]
export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      description
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
            variants(first: 10) {  
              edges {
                node {
                  id
                  title
                  availableForSale  
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// QUERY FOR SEARCHING PRODUCTS, PAGES, AND BLOGS

export const SEARCH_QUERY = `
  query Search($query: String!) {
    products(first: 5, query: $query) {
      edges { node { id title handle images(first: 1) { edges { node { url } } } } }
    }
    articles(first: 5, query: $query, sortKey: PUBLISHED_AT, reverse: true) {
      edges { node { id title handle blog { title } } }
    }
    pages(first: 5, query: $query) {
      edges { node { id title handle } }
    }
  }
`;

//  QUERY TO FETCH ALL BLOGS

export const GET_ALL_ARTICLES = `
  {
  articles(first: 220, sortKey: PUBLISHED_AT, reverse: true) {
    edges {
      node {
        id
        title
        handle
        blog {
          title
          handle
        }
        excerpt
        contentHtml
        publishedAt
        image {
          url
          altText
        }
        author {
          name
        }
          tags
      }
    }
  }
}

`;

export const GET_PAGINATED_ARTICLES = `
  query GetPaginatedArticles($first: Int!, $after: String) {
    articles(first: $first, after: $after, sortKey: PUBLISHED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          excerpt
          contentHtml
          publishedAt
          image {
            url
            altText
          }
          author {
            name
          }
            tags
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
