import React from "react"; // Import the CSS file

const ecoIcon = [
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Cruelty_Free.jpg?v=1725340405",
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Sulphate.jpg?v=1725338587",
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Paraben.jpg?v=1725338587",
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Plant_Based.jpg?v=1725340405",
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Non_Toxic.jpg?v=1725340404",
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/Clinically_Proven.jpg?v=1725338587",
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/CIR.jpg?v=1725340405",
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/GMP.jpg?v=1725340683",
];

const MarqueeEcoIcons = () => {
  return (
    <div className="uniq-econIcon-marquee">
      <div className="uniq-econIcon-marquee-content">
        {ecoIcon.concat(ecoIcon).map((src, index) => (
          <img key={index} src={src} alt={`uniq-econIcon-marquee-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default MarqueeEcoIcons;
