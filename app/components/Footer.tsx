export default function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/jojo_.the3rd._/",
    },
  ];

  return (
    <footer className="bg-black">
      {/* White separator bar */}
      <div className="w-full h-px bg-white"></div>
      
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="boiler-room-font text-sm uppercase text-white hover:text-gray-300 transition-colors duration-200"
              >
                {social.name}
              </a>
            ))}
            <a
              href="/contact"
              className="boiler-room-font text-sm uppercase text-white hover:text-gray-300 transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href="/admin"
              className="boiler-room-font text-sm uppercase text-white hover:text-gray-300 transition-colors duration-200"
            >
              Admin
            </a>
          </div>
          <p className="boiler-room-font text-xs uppercase text-white tracking-wider">
            © {new Date().getFullYear()} JOSEPH'S DANCING HIGHLIGHTS
          </p>
        </div>
      </div>
    </footer>
  );
}
