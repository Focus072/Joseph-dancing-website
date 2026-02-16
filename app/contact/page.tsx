import Header from "../components/Header";

export const metadata = {
  title: "Contact - Joseph's Dancing Highlights",
  description: "Get in touch with Joseph for dance opportunities, collaborations, and inquiries",
  keywords: ["contact", "dance opportunities", "collaboration", "booking", "inquiry"],
};

export default function ContactPage() {
  const contactInfo = {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@example.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  };

  return (
    <main className="min-h-screen bg-black">
      <Header />

      <section className="w-full bg-black py-12 md:py-16">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="boiler-room-font text-4xl sm:text-5xl md:text-6xl uppercase text-white mb-6 text-center">
              Contact
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-12 text-center max-w-2xl mx-auto">
              Get in touch for dance opportunities, collaborations, performances, or inquiries
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 md:p-12">
              <div className="space-y-8">
                <div>
                  <h2 className="boiler-room-font text-xl uppercase text-white mb-4">
                    Email
                  </h2>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-white hover:text-gray-300 transition-colors text-lg"
                  >
                    {contactInfo.email}
                  </a>
                </div>

                {contactInfo.phone && (
                  <div>
                    <h2 className="boiler-room-font text-xl uppercase text-white mb-4">
                      Phone
                    </h2>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-white hover:text-gray-300 transition-colors text-lg"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                )}

                <div className="pt-8 border-t border-gray-800">
                  <h2 className="boiler-room-font text-xl uppercase text-white mb-4">
                    Social Media
                  </h2>
                  <p className="text-gray-400 mb-4">
                    You can also reach out through Instagram:
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/jojo_.the3rd._/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="boiler-room-font text-sm uppercase text-white hover:text-gray-300 transition-colors border border-gray-700 px-4 py-2 rounded-lg hover:border-white"
                    >
                      Instagram
                    </a>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-800">
                  <h2 className="boiler-room-font text-xl uppercase text-white mb-4">
                    Availability
                  </h2>
                  <p className="text-gray-400">
                    Available for performances, collaborations, workshops, and dance-related projects. 
                    Please reach out via email or social media to discuss opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
