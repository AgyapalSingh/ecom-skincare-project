/**
 * @typedef {Object} Menu
 * @property {string} title
 * @property {string} path
 */

/**
 * @typedef {Object} ShopifyMenuOperation
 * @property {Object} data
 * @property {Object} [data.menu]
 * @property {Object[]} data.menu.items
 * @property {string} data.menu.items.title
 * @property {string} data.menu.items.url
 * @property {Object} variables
 * @property {string} variables.handle
 */

/**
 * @typedef {Object} Money
 * @property {string} amount
 * @property {string} currencyCode
 */

/**
 * @typedef {Object} ProductOption
 * @property {string} id
 * @property {string} name
 * @property {string[]} values
 */

/**
 * @template T
 * @typedef {Object} Edge
 * @property {T} node
 */

/**
 * @template T
 * @typedef {Object} Connection
 * @property {Edge<T>[]} edges
 */

/**
 * @typedef {Object} ProductVariant
 * @property {string} id
 * @property {string} title
 * @property {boolean} availableForSale
 * @property {Object[]} selectedOptions
 * @property {string} selectedOptions.name
 * @property {string} selectedOptions.value
 * @property {Money} price
 */

/**
 * @typedef {Object} Image
 * @property {string} url
 * @property {string} altText
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {Object} SEO
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} ShopifyProduct
 * @property {string} id
 * @property {string} handle
 * @property {boolean} availableForSale
 * @property {string} title
 * @property {string} description
 * @property {string} descriptionHtml
 * @property {ProductOption[]} options
 * @property {Object} priceRange
 * @property {Money} priceRange.maxVariantPrice
 * @property {Money} priceRange.minVariantPrice
 * @property {Connection<ProductVariant>} variants
 * @property {Image} featuredImage
 * @property {Connection<Image>} images
 * @property {SEO} seo
 * @property {string[]} tags
 * @property {string} updatedAt
 */

/**
 * @typedef {Omit<ShopifyProduct, "variants" | "images"> & {
 *   variants: ProductVariant[];
 *   images: Image[];
 * }} Product
 */

/**
 * @typedef {Object} ShopifyProductsOperation
 * @property {Object} data
 * @property {Connection<ShopifyProduct>} data.products
 * @property {Object} variables
 * @property {string} [variables.query]
 * @property {boolean} [variables.reverse]
 * @property {string} [variables.sortKey]
 */

/**
 * @typedef {Object} ShopifyCollection
 * @property {string} handle
 * @property {string} title
 * @property {string} description
 * @property {SEO} seo
 * @property {string} updatedAt
 */

/**
 * @typedef {ShopifyCollection & {
 *   path: string
 * }} Collection
 */

/**
 * @typedef {Object} ShopifyCollectionsOperation
 * @property {Object} data
 * @property {Connection<ShopifyCollection>} data.collections
 */

/**
 * @typedef {Object} ShopifyCollectionProductsOperation
 * @property {Object} data
 * @property {Object} data.collection
 * @property {Connection<ShopifyProduct>} data.collection.products
 * @property {Object} variables
 * @property {string} variables.handle
 * @property {boolean} [variables.reverse]
 * @property {string} [variables.sortKey]
 */

/**
 * @typedef {Object} ShopifyProductOperation
 * @property {Object} data
 * @property {ShopifyProduct} data.product
 * @property {Object} variables
 * @property {string} variables.handle
 */

/**
 * @typedef {Object} CartProduct
 * @property {string} id
 * @property {string} handle
 * @property {string} title
 * @property {Image} featuredImage
 */

/**
 * @typedef {Object} CartItem
 * @property {string | undefined} id
 * @property {number} quantity
 * @property {Object} cost
 * @property {Money} cost.totalAmount
 * @property {Object} merchandise
 * @property {string} merchandise.id
 * @property {string} merchandise.title
 * @property {Object[]} merchandise.selectedOptions
 * @property {string} merchandise.selectedOptions.name
 * @property {string} merchandise.selectedOptions.value
 * @property {CartProduct} merchandise.product
 */

/**
 * @typedef {Object} ShopifyCart
 * @property {string | undefined} id
 * @property {string} checkoutUrl
 * @property {Object} cost
 * @property {Money} cost.subtotalAmount
 * @property {Money} cost.totalAmount
 * @property {Money} cost.totalTaxAmount
 * @property {Connection<CartItem>} lines
 * @property {number} totalQuantity
 */

/**
 * @typedef {Object} ShopifyCartOperation
 * @property {Object} data
 * @property {ShopifyCart} data.cart
 * @property {Object} variables
 * @property {string} variables.cartId
 */

/**
 * @typedef {Object} ShopifyCreateCartOperation
 * @property {Object} data
 * @property {Object} data.cartCreate
 * @property {ShopifyCart} data.cartCreate.cart
 */

/**
 * @typedef {Object} ShopifyUpdateCartOperation
 * @property {Object} data
 * @property {Object} data.cartLinesUpdate
 * @property {ShopifyCart} data.cartLinesUpdate.cart
 * @property {Object} variables
 * @property {string} variables.cartId
 * @property {Object[]} variables.lines
 * @property {string} variables.lines.id
 * @property {string} variables.lines.merchandiseId
 * @property {number} variables.lines.quantity
 */

/**
 * @typedef {Object} ShopifyRemoveFromCartOperation
 * @property {Object} data
 * @property {Object} data.cartLinesRemove
 * @property {ShopifyCart} data.cartLinesRemove.cart
 * @property {Object} variables
 * @property {string} variables.cartId
 * @property {string[]} variables.lineIds
 */

/**
 * @typedef {Omit<ShopifyCart, "lines"> & {
 *   lines: CartItem[];
 * }} Cart
 */

/**
 * @typedef {Object} ShopifyAddToCartOperation
 * @property {Object} data
 * @property {Object} data.cartLinesAdd
 * @property {ShopifyCart} data.cartLinesAdd.cart
 * @property {Object} variables
 * @property {string} variables.cartId
 * @property {Object[]} variables.lines
 * @property {string} variables.lines.merchandiseId
 * @property {number} variables.lines.quantity
 */

/**
 * @typedef {Object} ShopifyProductRecommendationsOperation
 * @property {Object} data
 * @property {ShopifyProduct[]} data.productRecommendations
 * @property {Object} variables
 * @property {string} variables.productId
 */

/**
 * @typedef {Object} Page
 * @property {string} id
 * @property {string} title
 * @property {string} handle
 * @property {string} body
 * @property {string} bodySummary
 * @property {SEO} [seo]
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} ShopifyPageOperation
 * @property {Object} data
 * @property {Page} data.pageByHandle
 * @property {Object} variables
 * @property {string} variables.handle
 */

/**
 * @typedef {Object} ShopifyPagesOperation
 * @property {Object} data
 * @property {Connection<Page>} data.pages
 */
