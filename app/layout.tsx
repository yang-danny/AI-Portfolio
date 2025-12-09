import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Portfolio - Full Stack Architect & AI Engineer",
  description:
    "Interactive 3D portfolio showcasing AI/ML projects, full-stack development expertise, and innovative solutions.",
  keywords: [
    "AI",
    "Full Stack",
    "Machine Learning",
    "Portfolio",
    "React",
    "Next.js",
    "Three.js",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "AI Portfolio - Full Stack Architect & AI Engineer",
    description:
      "Interactive 3D portfolio showcasing AI/ML projects and full-stack development expertise.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
