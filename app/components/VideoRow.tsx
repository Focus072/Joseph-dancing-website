'use client';

import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";

interface MediaItem {
  id: string;
  type: "video" | "photo" | "embed";
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  embedUrl?: string;
  category?: string;
}

interface VideoRowProps {
  category: string;
  items: MediaItem[];
}

export default function VideoRow({ category, items }: VideoRowProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  return (
    <>
      <div className="mb-12">
        <h2 className="boiler-room-font text-2xl md:text-3xl uppercase text-white mb-6">
          {category}
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-64 md:w-80 cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative aspect-video bg-gray-900 overflow-hidden">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title || "Video thumbnail"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 256px, 320px"
                  />
                ) : item.type === "video" || item.type === "embed" ? (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                ) : (
                  <Image
                    src={item.url}
                    alt={item.title || "Media"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 256px, 320px"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-300 border border-white/20">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
              {item.title && (
                <div className="mt-3">
                  <p className="boiler-room-font text-sm uppercase text-white">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div className="max-w-4xl w-full max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <VideoPlayer item={selectedItem} />
            {selectedItem.title && (
              <div className="mt-3 sm:mt-4 text-white px-2 sm:px-0">
                <h3 className="text-lg sm:text-2xl font-semibold">{selectedItem.title}</h3>
                {selectedItem.description && (
                  <p className="mt-2 text-sm sm:text-base text-gray-300">{selectedItem.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
