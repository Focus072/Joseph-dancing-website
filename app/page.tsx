import Gallery from "./components/Gallery";
import Header from "./components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Joseph's Dancing Highlights",
  description: "Welcome to Joseph's dancing highlights. Explore performances, videos, and photography showcasing movement, artistry, and passion through dance.",
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

export default async function Home() {
  const mediaItems = await getMedia();

  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Hero Section - Full Width */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-white mb-8 tracking-tight leading-tight">
            JOSEPH'S DANCING<br />HIGHLIGHTS
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 max-w-3xl mx-auto font-light">
            Showcasing movement, artistry, and passion through dance
          </p>
        </div>
      </section>

      {/* VISUALS Section - Full Width Grid */}
      {mediaItems.length > 0 && (
        <section className="relative w-full bg-black py-16 md:py-24">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <Gallery items={mediaItems} />
          </div>
        </section>
      )}

      {mediaItems.length === 0 && (
        <section className="relative w-full bg-black py-24 md:py-32">
          <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
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
              Coming Soon
            </h3>
            <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto">
              New dance highlights will be added here soon. Check back later!
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
