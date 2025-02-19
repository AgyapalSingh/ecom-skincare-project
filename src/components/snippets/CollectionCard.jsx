import React from "react";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({collection}) => {
  const navigate = useNavigate();
  return (
    <div
      key={collection.id}
      className="text-center border p-4 rounded-md cursor-pointer"
      onClick={() => navigate(`/allcollections/${collection.handle}`)}
    >
      <img
        src={collection.image?.url || "default-image.jpg"}
        alt={collection.image?.altText || collection.title}
        className="w-full h-40 object-cover mb-2"
      />
      <h3 className="text-lg font-semibold">{collection.title}</h3>
    </div>
  );
};

export default CollectionCard;
