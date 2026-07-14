import type { Metadata } from "next";

// The page itself is a client component ("use client" for the intake form),
// so its route metadata lives here in a server-side layout.
export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Schedule a Flash Session or Stack Consultation with The DSIE Codex. Every engagement starts with fit.",
};

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
