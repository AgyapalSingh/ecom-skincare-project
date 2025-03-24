import React from "react";

const Image = ({ largeImageSrc, smallImageSrc }) => {
  return (
    <div className="uniq-ag-image-component">
      {largeImageSrc && <img className="uniq-ag-large-img" alt="Image" src={largeImageSrc} />}

      {smallImageSrc && <img className="uniq-ag-small-img" alt="Image" src={smallImageSrc} />}
    </div>
  );
};

export default Image;
