import React from "react";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ collection }) => {
  const navigate = useNavigate();
  return (
    <div
      key={collection.id}
      className="uniq-coll-card"
      onClick={() => navigate(`/allcollections/${collection.handle}`)}
    >
      <img
        src={collection.image?.url || "default-image.jpg"}
        alt={collection.image?.altText || collection.title}
        className="uniq-coll-card-img "
      />
      <h3 className="uniq-coll-card-title">{collection.title}</h3>
    </div>
  );
};

export default CollectionCard;
