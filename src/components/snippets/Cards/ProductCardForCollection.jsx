import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

const ProductCardForCollection = ({
  product,
  collectionHandle,
  openCartDrawer,
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // UNIQ - Change Image on Hover
  const [isHovered, setIsHovered] = useState(false);
  const firstImage = product.images.edges[0]?.node.src || "default-image.jpg";
  const secondImage = product.images.edges[1]?.node.src || null;
  const imageSrc = isHovered && secondImage ? secondImage : firstImage;

  // UNIQ - Handle variant selection
  const variants = product.variants.edges.map((edge) => edge.node);
  const [selectedVariant, setSelectedVariant] = useState(
    variants.length > 0 ? variants[0] : null
  );
  const handleVariantChange = (event) => {
    const variant = variants.find((v) => v.id === event.target.value);
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      // Extract numeric ID from Shopify's Base64 ID
      const variantId = selectedVariant.id.split("/").pop();
  
      // Construct the product URL with the selected variant
      const productUrl = `${window.location.origin}/allcollections/${collectionHandle}/${product.handle}?variant=${variantId}`;
      // console.log(productUrl, "Product Url from Product Card of Collection")

      addToCart({
        id: variantId, // Use numeric ID only
        title: `${product.title} - ${selectedVariant.title}`,
        price: selectedVariant.price.amount,
        image: firstImage,
        url: productUrl, // Send URL to cart
      });
  
      openCartDrawer();
    }
  };
  

  return (
    <div key={product.id} className="uniq-prod-for-col">
      <div
        className="uniq-col-prod-img-div"
        onMouseEnter={() => secondImage && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() =>
          navigate(`/allcollections/${collectionHandle}/${product.handle}`)
        }
      >
        <img
          src={imageSrc}
          alt={product.title}
          width={"350px"}
          height={"350px"}
        />
      </div>
      <div className="uniq-col-prod-titl-pric">
        <h3
          className="uniq-col-prod-title"
          onClick={() =>
            navigate(`/allcollections/${collectionHandle}/${product.handle}`)
          }
        >
          {/* {product.title.substring(0, 30)}... */}
          {product.title}
        </h3>

        <p className="uniq-col-prod-price">
          Rs. {selectedVariant ? selectedVariant.price.amount : "N/A"}
        </p>
      </div>

      {variants.length > 1 && (
        <div className="uniq-col-prod-varient">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() =>
                handleVariantChange({ target: { value: variant.id } })
              }
              className={` ${
                selectedVariant?.id === variant.id
                  ? "uniq-col-prod-varient-btn-select"
                  : "uniq-col-prod-varient-btn"
              }`}
            >
              {/* {variant.title} - Rs. {variant.price.amount} */}
              {variant.title}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={handleAddToCart
        }
        className={` ${
          selectedVariant?.availableForSale
            ? "uniq-col-prod-atc-btn"
            : "uniq-col-prod-atc-btn-others"
        }`}
        disabled={!selectedVariant?.availableForSale}
      >
        {selectedVariant?.availableForSale ? "Add to Cart" : "Restocking"}
      </button>
    </div>
  );
};

export default ProductCardForCollection;
