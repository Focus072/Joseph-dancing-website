import Header from "../components/Header";
import VideoRow from "../components/VideoRow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos - Joseph's Dancing Highlights",
  description: "Watch Joseph's dance videos organized by category. Browse performances, behind-the-scenes content, and dance highlights.",
};

async function getMedia() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/media`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching media:", error);
    return [];
  }
}

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


export default async function HighlightsPage() {
  const mediaItems = await getMedia();
  
  // Filter only videos and embeds, group by category
  const videoItems = mediaItems.filter(
    (item) => (item.type === "video" || item.type === "embed") && !item.archived
  );

  // Group by category
  const groupedByCategory = videoItems.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MediaItem[]>);

  // Sort categories alphabetically, but put "Uncategorized" last
  const categories = Object.keys(groupedByCategory).sort((a, b) => {
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;
    return a.localeCompare(b);
  });

  return (
    <main className="min-h-screen bg-black">
      <Header />

      <section className="w-full bg-black py-12 md:py-16">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          {categories.length > 0 ? (
            categories.map((category) => (
              <VideoRow
                key={category}
                category={category}
                items={groupedByCategory[category]}
              />
            ))
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-8">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                No Videos Yet
              </h3>
              <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto">
                Videos will appear here once they are added and categorized.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
