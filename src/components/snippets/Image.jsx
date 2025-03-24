import React from "react";

const Image = ({ largeImageSrc, smallImageSrc }) => {
  return (
    <div className="uniq-ag-image-component">
      {largeImageSrc && <img className="uniq-ag-large-img" src={largeImageSrc} />}

      {smallImageSrc && <img className="uniq-ag-small-img" src={smallImageSrc} />}
    </div>
  );
};

export default Image;
