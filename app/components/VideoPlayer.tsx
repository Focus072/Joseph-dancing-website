"use client";

import ReactPlayer from "react-player";

interface MediaItem {
  id: string;
  type: "video" | "photo" | "embed";
  url: string;
  embedUrl?: string;
}

interface VideoPlayerProps {
  item: MediaItem;
}

export default function VideoPlayer({ item }: VideoPlayerProps) {

  if (item.type === "photo") {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <img
          src={item.url}
          alt="Photo"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (item.type === "embed" && item.embedUrl) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <ReactPlayer
          url={item.embedUrl}
          width="100%"
          height="100%"
          controls
          playing
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        src={item.url}
        controls
        autoPlay
        className="w-full h-full"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
