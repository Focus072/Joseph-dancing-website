import Header from "../components/Header";
import Gallery from "../components/Gallery";
import { getMediaItems, type MediaItem } from "@/lib/media";

async function getMedia(): Promise<MediaItem[]> {
  try {
    return await getMediaItems();
  } catch (error) {
    console.error("Error fetching media:", error);
    return [];
  }
}

export const metadata = {
  title: "Pictures - Joseph's Dancing Highlights",
  description: "Browse photos and images from Joseph's dance performances and highlights",
  keywords: ["dance photos", "dance photography", "performance photos", "dance images"],
};

export default async function PicturesPage() {
  const mediaItems = await getMedia();
  
  // Filter only photos
  const photoItems = mediaItems.filter(
    (item) => item.type === "photo" && !item.archived
  );

  return (
    <main className="min-h-screen bg-black">
      <Header />

      <section className="w-full bg-black py-12 md:py-16">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          {photoItems.length > 0 ? (
            <>
              <div className="mb-12">
                <h1 className="boiler-room-font text-4xl sm:text-5xl md:text-6xl uppercase text-white mb-4">
                  Pictures
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
                  A collection of photos from performances, rehearsals, and dance moments
                </p>
              </div>
              <Gallery items={photoItems} />
            </>
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                No Photos Yet
              </h3>
              <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto">
                Photos will appear here once they are uploaded.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
