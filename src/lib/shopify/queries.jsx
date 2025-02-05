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

export const GET_COLLECTION_NEWLY_LAUNCHED_BY_ID = `{
  collection(id: "gid://shopify/Collection/584186953892") {
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
    }
  }
`;

// 5. QUERY TO FETCH PRODUCT FROM HANDLE
// [ALSO USED TO CREATE DYNAMIC PRODUCT PAGE - BUT DIFFERENCE IS WHEN PRODUCT IS CLICKED FROM COLLECTION]
// export const GET_PRODUCT_BY_HANDLE_FROM_COLLECTION = `
//   query getProductByHandle($handle: String!) {
//     productByHandle(handle: $handle) {
//       id
//       title
//       description
//       featuredImage {
//         url
//         altText
//       }
//       priceRange {
//         minVariantPrice {
//           amount
//         }
//       }
//     }
//   }
// `;

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
// export const GET_COLLECTION_BY_HANDLE = `
//   query GetCollectionByHandle($handle: String!) {
//     collectionByHandle(handle: $handle) {
//       id
//       title
//       handle
//       description
//       products(first: 20) {
//         edges {
//           node {
//             id
//             title
//             handle
//             featuredImage {
//               url
//               altText
//             }
//             priceRange {
//               minVariantPrice {
//                 amount
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;


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
