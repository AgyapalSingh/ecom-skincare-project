export const GET_PRODUCTS = `
  {
    products(first:70) {
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
