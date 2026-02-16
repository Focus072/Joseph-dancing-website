import Header from "../components/Header";

export const metadata = {
  title: "Social Media - Joseph's Dancing Highlights",
  description: "Connect with Joseph on Instagram",
  keywords: ["social media", "Instagram", "follow", "dance"],
};

const INSTAGRAM_URL = "https://www.instagram.com/jojo_.the3rd._/";

export default function SocialPage() {
  const socialLinks = [
    {
      name: "Instagram",
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || INSTAGRAM_URL,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      <Header />

      <section className="w-full bg-black py-12 md:py-16">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="boiler-room-font text-4xl sm:text-5xl md:text-6xl uppercase text-white mb-6">
              Social Media
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Follow Joseph's dance journey on social media
            </p>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-sm mx-auto">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-gray-800 rounded-xl p-8 hover:border-white transition-all duration-300 hover:bg-gray-900"
                >
                  <div className="text-white mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </div>
                  <h3 className="boiler-room-font text-xl uppercase text-white mb-2">
                    {social.name}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    Follow on {social.name}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-16 p-6 bg-gray-900 border border-gray-800 rounded-xl">
              <p className="text-gray-400 text-sm">
                For the latest updates, performances, and behind-the-scenes content, 
                follow Joseph on Instagram.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
