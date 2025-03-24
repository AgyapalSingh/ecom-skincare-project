import React from "react";

const Video = ({ largeVideoSrc, smallVideoSrc }) => {
  return (
    <div className="uniq-ag-video-component">
      {largeVideoSrc && (
        <video className="uniq-ag-large-vid" autoPlay loop muted playsInline>
          <source src={largeVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {smallVideoSrc && (
        <video className="uniq-ag-small-vid" autoPlay loop muted playsInline>
          <source src={smallVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Video;
