import React from "react";
import videoPoster from "../../images/career/img06.jpg";

const VideoSection: React.FC = () => {
  return (
    <div className="container">
      <div className="xb-video">
        <video
          loop
          muted
          playsInline
          autoPlay
          poster={videoPoster}
          preload="auto"
        >
          <source
            src="https://www.pexels.com/download/video/7693469/"
            type="video/mp4"
          />
          Tu navegador no soporta video.
        </video>
      </div>
    </div>
  );
};

export default VideoSection;
