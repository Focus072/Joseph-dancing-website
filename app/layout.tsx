import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Joseph's Dancing Highlights",
  description: "Showcasing movement, artistry, and passion through dance. Explore Joseph's dance performances, videos, and photography.",
  keywords: ["dance", "dancing", "performance", "dancer", "choreography", "Joseph"],
  openGraph: {
    title: "Joseph's Dancing Highlights",
    description: "Showcasing movement, artistry, and passion through dance",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph's Dancing Highlights",
    description: "Showcasing movement, artistry, and passion through dance",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
