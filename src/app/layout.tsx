import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Space_Grotesk, Space_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thedsiecodex.com"),
  title: {
    default: "The DSIE Codex LLC",
    template: "%s — The DSIE Codex LLC",
  },
  description: "Fractional AI integration consultancy. We build, secure, and operate custom AI systems for small businesses.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "The DSIE Codex LLC",
    description: "Fractional AI integration consultancy. We build, secure, and operate custom AI systems for small businesses.",
    url: "https://thedsiecodex.com",
    siteName: "The DSIE Codex",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The DSIE Codex LLC — Fractional AI Integration",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The DSIE Codex LLC",
    description: "Fractional AI integration consultancy. We build, secure, and operate custom AI systems for small businesses.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${spaceMono.variable} scroll-smooth`}
    >
      <body className="bg-background text-cream font-sans antialiased min-h-screen flex flex-col justify-between">
        <Nav />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
