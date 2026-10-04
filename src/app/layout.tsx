import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://thedsiecodex.com"),
  title: "The DSIE Codex | Fractional Back Office for the Trades — Springfield, MO",
  description:
    "Modular fractional back office for Springfield trade and service businesses. Tech, sales, and revenue operations delivered personally by a solo operator, starting at $99/mo.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "The DSIE Codex | The Fractional Back Office for the Trades",
    description:
      "On-call field tech support, automated lead tracking, and streamlined billing for Springfield-area contractors and service businesses.",
    url: "https://thedsiecodex.com",
    siteName: "The DSIE Codex",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The DSIE Codex | The Fractional Back Office for the Trades",
    description:
      "On-call field tech support, automated lead tracking, and streamlined billing for Springfield-area contractors and service businesses.",
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
      className={`${spaceGrotesk.variable} ${spaceMono.variable} scroll-smooth`}
    >
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased min-h-screen flex flex-col justify-between">
        <Nav />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
