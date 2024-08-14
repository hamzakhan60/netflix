"use client"
import { useEffect, useState } from "react";

const VideoPlayer = ({ videoUrl }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(videoUrl);
    console.log("Video URL set:", videoUrl);
  }, [videoUrl]);

  if (!url) {
    return <p>Loading...</p>;
  }

  return (
    <div className="video-container bg-black flex w-full h-screen-150">
      <video
        className="video-iframe -mt-24 w-full h-screen-150"
        src={url}
        autoPlay
        loop
        muted
        controls={false}
        onLoadedData={() => console.log("Video loaded")}
        onError={() => console.log("Video load error")}
      ></video>
    </div>
  );
};

export default VideoPlayer;
