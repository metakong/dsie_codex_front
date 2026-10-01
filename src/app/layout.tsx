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
  title: "The DSIE Codex | Operational Diagnostics & RevOps — Springfield, MO",
  description:
    "Automated open-book scoreboards, stateless MCP enterprise bridges, and turnaround variance audits for Springfield-area manufacturing and logistics operators.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "The DSIE Codex | Operational Diagnostics & RevOps",
    description:
      "Automated open-book scoreboards, stateless MCP enterprise bridges, and turnaround variance audits for Springfield-area manufacturing and logistics operators.",
    url: "https://thedsiecodex.com",
    siteName: "The DSIE Codex",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The DSIE Codex | Operational Diagnostics & RevOps",
    description:
      "Automated open-book scoreboards, stateless MCP enterprise bridges, and turnaround variance audits for Springfield-area manufacturing and logistics operators.",
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
